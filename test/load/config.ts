export const config = {
	// approximates the volume of data in prod as of Nov 2026
	seed: {
		trainers: 100_000,
		pokemonPerTrainer: 10,
		movesPerPokemon: 4,
		heldItemsPerPokemon: 1,
		featsPerPokemon: 1,
		inventoryItemsPerTrainer: 10,
		featsPerTrainer: 2,
		fakemon: 30_000,
		fakemonEvolutions: 5000,
		batchSize: 5000,
		prefix: "LoadTest ",
	},
	timing: {
		warmup: 3, // number of initial unmeasured runs so the first run isn't an extra long outlier
		iterations: 30,
	},
	db: {
		postgresUrl: process.env.LOAD_TEST_DB_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
		supabaseUrl: process.env.LOAD_TEST_SUPABASE_URL ?? "http://127.0.0.1:54321",
		supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
	},
} as const
