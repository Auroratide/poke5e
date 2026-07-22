#!/usr/bin/env node
// Initial code: Opus 4.8
// Prompt: Give me a javascript script which uses the Pokemon API to, for each pokemon, list every move the pokemon can learn and how regardless of which game. For example, if Pikachu can learn thunderbolt in Red/Blue but not in the most recent games, still list thunderbolt as a move it can learn. I care whether moves can be learned by leveling up (including their starting level), TM, or as an egg move.
// Output two files: one json and one markdown.
// json format:
// ```
// [{"pokemon": "bulbasaur", "moves": { "levelup": [], "tm": [], "egg": [] }]
// ```
// markdown format:
// ```
// ## bulbasaur
// move (level up)
// move (tm)
// move (level up, tm)
// ```

import fs from "node:fs/promises"

const API = 'https://pokeapi.co/api/v2';
const CONCURRENCY = 12;      // simultaneous in-flight requests (be kind to the API)
const MAX_RETRIES = 4;       // retry transient failures
const RETRY_BASE_MS = 600;   // exponential backoff base

// PokeAPI move-learn-method name  ->  our output key.
// Anything not listed here (tutor, special events, light-ball-egg, etc.) is
// intentionally ignored, since we only care about these three methods.
const METHOD_MAP = {
  'level-up': 'levelup',
  'machine': 'tm',   // covers both TMs and HMs
  'egg': 'egg',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, attempt = 0) {
  try {
    const res = await fetch(url);
    if (res.status === 404) return null;          // skip missing entries
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= MAX_RETRIES) throw err;
    await sleep(RETRY_BASE_MS * 2 ** attempt);     // back off and retry
    return fetchJson(url, attempt + 1);
  }
}

// Concurrency-limited map with a simple progress readout.
async function pooledMap(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  let done = 0;
  async function run() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
      done++;
      if (done % 50 === 0 || done === items.length) {
        process.stdout.write(`\r  processed ${done}/${items.length}`);
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, run)
  );
  process.stdout.write('\n');
  return results;
}

// name -> { methods: Set<string>, level: number|null }
// `level` is the lowest level the move is ever learned at via level-up, across
// every game (null if it is not a level-up move). Note: PokeAPI uses level 0 for
// moves gained on evolution and level 1 for a Pokemon's starting moves.
function categorizeMoves(pokemon) {
  const moveInfo = new Map();
  for (const entry of pokemon.moves) {
    const name = entry.move.name;
    for (const detail of entry.version_group_details) {
      const key = METHOD_MAP[detail.move_learn_method.name];
      if (!key) continue;               // ignore methods we don't track
      if (!moveInfo.has(name)) moveInfo.set(name, { methods: new Set(), level: null });
      const info = moveInfo.get(name);
      info.methods.add(key);
      if (key === 'levelup') {
        const lvl = detail.level_learned_at;
				const where = detail.version_group.name
        if (info.level === null || lvl < info.level) { 
					info.level = lvl;
					info.where = where
				}
      }
    }
  }
  return moveInfo;
}

function buildJsonEntry(name, moveInfo) {
  const buckets = { levelup: [], tm: [], egg: [] };
  for (const [move, info] of moveInfo) {
    if (info.methods.has('levelup')) buckets.levelup.push([info.level, move, info.where]);
    if (info.methods.has('tm')) buckets.tm.push(move);
    if (info.methods.has('egg')) buckets.egg.push(move);
  }
  buckets.levelup.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
  buckets.tm.sort();
  buckets.egg.sort();
  return { pokemon: name, moves: buckets };
}

async function main() {
  console.log('Fetching the full Pokemon index...');
  const index = await fetchJson(`${API}/pokemon?limit=100000`);
  const list = index.results; // [{ name, url }, ...]  (includes alternate forms)
  console.log(`Found ${list.length} Pokemon. Fetching move data...`);

  const entries = await pooledMap(list, CONCURRENCY, async ({ url }) => {
    const data = await fetchJson(url);
    if (!data) return null;
    const moveInfo = categorizeMoves(data);
    return {
      json: buildJsonEntry(data.name, moveInfo),
    };
  });

  const ok = entries.filter(Boolean);
  const jsonOut = ok.map((e) => e.json);

  await fs.writeFile('scripts/moves/out/pokemon-moves.json', JSON.stringify(jsonOut, null, "\t"));

  console.log('\nDone.');
  console.log(`  pokemon-moves.json  (${jsonOut.length} Pokemon)`);
}

main().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});