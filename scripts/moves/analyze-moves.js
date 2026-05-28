#!/usr/bin/env node

/**
 * Analyzes which DnD 5e stats are most commonly used for Physical vs Special moves,
 * broken down by Pokemon type.
 *
 * Usage: node analyze_move_stats.js
 *
 * Expects:
 *   ./scripts/moves/out/cache.json  — PokeAPI move data (array of move objects)
 *   ./static/data/moves.json        — DnD move data ({ moves: [...] })
 */

import fs from "node:fs"
import path from "node:path"

// ── Load data ────────────────────────────────────────────────────────────────

const cacheRaw = fs.readFileSync(
  path.resolve("./scripts/moves/out/cache.json"),
  "utf8"
);
const pokeCache = JSON.parse(cacheRaw); // array

const dndRaw = fs.readFileSync(
  path.resolve("./static/data/moves.json"),
  "utf8"
);
const { moves: dndMoves } = JSON.parse(dndRaw); // array

// ── Build lookup: move id → DnD power stats ──────────────────────────────────

// DnD moves use their name (lowercased, hyphenated) as id, matching PokeAPI's name field.
const dndById = new Map();
for (const m of dndMoves) {
  dndById.set(m.id.toLowerCase(), m);
}

// ── Aggregate ────────────────────────────────────────────────────────────────

// Structure: results[damageClass][type][stat] = count
// damageClass: "physical" | "special"
// type: e.g. "grass", "fire", …
// stat: e.g. "str", "dex", "con", "int", "wis", "cha"

const results = {};

let matched = 0;
let unmatched = 0;
const unmatchedNames = [];

for (const pkMove of pokeCache) {
  const damageClass = pkMove.damage_class?.name; // "physical", "special", or "status"

  // Only care about physical and special
  if (damageClass !== "physical" && damageClass !== "special") continue;

  const type = pkMove.type?.name;
  if (!type) continue;

  // Look up the DnD version by move name
  const dndMove = dndById.get(pkMove.name.toLowerCase());
  if (!dndMove) {
    unmatched++;
    unmatchedNames.push(pkMove.name);
    continue;
  }

  // power can be a string or an array of strings
  const powerStats = Array.isArray(dndMove.power)
    ? dndMove.power
    : dndMove.power
    ? [dndMove.power]
    : [];

  if (powerStats.length === 0) continue;

  matched++;

  // Ensure nested structure exists
  if (!results[damageClass]) results[damageClass] = {};
  if (!results[damageClass][type]) results[damageClass][type] = {};

  for (const stat of powerStats) {
    const s = stat.toLowerCase();
    results[damageClass][type][s] = (results[damageClass][type][s] ?? 0) + 1;
  }
}

// ── Format output ─────────────────────────────────────────────────────────────

function rankStats(statCounts) {
  return Object.entries(statCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([stat, count]) => `${stat.toUpperCase()} (${count})`)
    .join(", ");
}

console.log("=".repeat(70));
console.log(" Pokemon Move DnD Stat Analysis — by Damage Class + Type");
console.log("=".repeat(70));
console.log(`Matched moves: ${matched}  |  Unmatched (no DnD entry): ${unmatched}\n`);

for (const damageClass of ["physical", "special"]) {
  if (!results[damageClass]) {
    console.log(`\n── ${damageClass.toUpperCase()} ──\n  (no data)\n`);
    continue;
  }

  console.log(`\n${"─".repeat(70)}`);
  console.log(` ${damageClass.toUpperCase()} MOVES`);
  console.log(`${"─".repeat(70)}`);

  const types = Object.keys(results[damageClass]).sort();
  for (const type of types) {
    const statCounts = results[damageClass][type];
    const total = Object.values(statCounts).reduce((a, b) => a + b, 0);
    console.log(`  ${type.padEnd(12)} (${String(total).padStart(3)} moves)  →  ${rankStats(statCounts)}`);
  }
}

// ── Optional: emit JSON for further processing ────────────────────────────────

const outPath = path.resolve("./move_stat_analysis.json");
fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf8");
console.log(`\nFull counts written to: ${outPath}`);

// ── Debug: show unmatched names (first 20) ───────────────────────────────────

if (unmatchedNames.length > 0) {
  console.log(`\nFirst ${Math.min(20, unmatchedNames.length)} unmatched move names:`);
  console.log(unmatchedNames.slice(0, 20).join(", "));
}