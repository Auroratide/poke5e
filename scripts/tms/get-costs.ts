// Claude Sonnet 4.5 via Cline
// Help me implement the code in get-costs.ts. I have 100 pokemon moves for which I need the sale cost, and the Pokemon API does not have this info. Therefore, I am web-scraping it from pokemon db. I have put in comments what I think needs to be done. Please implement the code.

import * as cheerio from 'cheerio';

const MOVES_TO_LOOKUP = [
	"dragon-dance",
	"power-gem",
	"gunk-shot",
	"iron-defense",
	"drill-run",
	"crunch",
	"trick",
	"liquidation",
	"giga-drain",
	"aura-sphere",
	"tailwind",
	"dragon-pulse",
	"stealth-rock",
	"hyper-voice",
	"heat-wave",
	"heavy-slam",
	"encore",
	"ice-spinner",
	"play-rough",
	"amnesia",
	"helping-hand",
	"pollen-puff",
	"baton-pass",
	"earth-power",
	"reversal",
	"electric-terrain",
	"grassy-terrain",
	"psychic-terrain",
	"misty-terrain",
	"nasty-plot",
	"hydro-pump",
	"fire-pledge",
	"water-pledge",
	"grass-pledge",
	"phantom-force",
	"blast-burn",
	"hydro-cannon",
	"frenzy-plant",
	"outrage",
	"leaf-storm",
	"hurricane",
	"bug-buzz",
	"brave-bird",
	"flare-blitz",
	"close-combat",
	"draco-meteor",
	"steel-beam",
	"tera-blast",
	"charge",
	"haze",
	"sand-tomb",
	"spite",
	"gravity",
	"knock-off",
	"bug-bite",
	"super-fang",
	"vacuum-wave",
	"lunge",
	"high-horsepower",
	"icicle-spear",
	"heat-crash",
	"solar-blade",
	"uproar",
	"focus-punch",
	"weather-ball",
	"grassy-glide",
	"burning-jealousy",
	"flip-turn",
	"dual-wingbeat",
	"poltergeist",
	"lash-out",
	"scale-shot",
	"misty-explosion",
	"pain-split",
	"double-edge",
	"endeavor",
	"petal-blizzard",
	"temper-flare",
	"whirlpool",
	"muddy-water",
	"supercell-slam",
	"electroweb",
	"triple-axel",
	"coaching",
	"scorching-sands",
	"feather-dance",
	"future-sight",
	"expanding-force",
	"skitter-smack",
	"meteor-beam",
	"throat-chop",
	"breaking-swipe",
	"metal-sound",
	"curse",
	"hard-press",
	"dragon-cheer",
	"alluring-voice",
	"psychic-noise",
	"upper-hand",
]

function normalizeCost(cost: string): number {
	// Remove commas and convert to number
	return parseInt(cost.replace(/,/g, ''), 10);
}

function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchMoveCost(moveName: string): Promise<number | null> {
	try {
		// Step 1: Fetch the move page
		const moveUrl = `https://pokemondb.net/move/${moveName}`;
		const moveResponse = await fetch(moveUrl);
		
		if (!moveResponse.ok) {
			console.error(`Failed to fetch ${moveUrl}: ${moveResponse.status}`);
			return null;
		}
		
		const moveHtml = await moveResponse.text();
		const $move = cheerio.load(moveHtml);
		
		// Step 2: Find the TM item link (looks like /item/tmXXX)
		let tmItemLink: string | null = null;
		$move('a[href^="/item/tm"]').each((_, element) => {
			const href = $move(element).attr('href');
			if (href && /\/item\/tm\d+/.test(href)) {
				tmItemLink = href;
				return false; // break the loop
			}
		});
		
		if (!tmItemLink) {
			console.error(`No TM link found for ${moveName}`);
			return null;
		}
		
		// Step 3: Fetch the TM item page
		const tmUrl = `https://pokemondb.net${tmItemLink}`;
		const tmResponse = await fetch(tmUrl);
		
		if (!tmResponse.ok) {
			console.error(`Failed to fetch ${tmUrl}: ${tmResponse.status}`);
			return null;
		}
		
		const tmHtml = await tmResponse.text();
		const $tm = cheerio.load(tmHtml);
		
		// Step 4: Find the text matching "TM Machine: XXXXX LP"
		let cost: number | null = null;
		$tm('*').each((_, element) => {
			const text = $tm(element).text();
			const match = text.match(/TM Machine:\s*([\d,]+)\s*LP/);
			if (match) {
				cost = normalizeCost(match[1]);
				return false; // break the loop
			}
		});
		
		if (cost === null) {
			console.error(`No cost found for ${moveName} at ${tmUrl}`);
			return null;
		}
		
		return cost;
	} catch (error) {
		console.error(`Error fetching cost for ${moveName}:`, error);
		return null;
	}
}

async function main() {
	for (const move of MOVES_TO_LOOKUP) {
		const cost = await fetchMoveCost(move);
		
		if (cost !== null) {
			console.log(`"${move}": ${cost},`);
		} else {
			console.log(`"${move}": null, // FAILED TO FETCH`);
		}
		
		// Add a delay to be respectful to the server
		await delay(500); // 500ms delay between requests
	}
}

main()
