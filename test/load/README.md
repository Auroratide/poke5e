# Load Testing

Seeds the **local** docker database with production-sized data, then times the RPCs the app calls when loading trainers and fakemon. The purpose is to compare changes empirically, such as before and after adding indexes.

It refuses to run against anything other than localhost.

## Running

```sh
pnpm services:start
pnpm supabase db reset   # start from a clean database
pnpm test:load --label before-indexes
```

The first run seeds about 7 million rows (100,000 trainers with pokemon, moves, items, and feats, plus 30,000 fakemon). Seeding takes a few minutes; later runs reuse the seeded data.

Requires Node 22.18+ (runs TypeScript directly).

## Comparing a change

1. Run once on the current schema: `pnpm test:load --label before`
2. Apply the change, e.g. a migration adding indexes, then `pnpm supabase db reset` (this wipes the seed, so the next run reseeds the same shape of data)
3. Run again: `pnpm test:load --label after`
4. Compare the two files in `test/load/results/`

## What is measured

- **Sequential**: each RPC called one at a time, through PostgREST with the anon key like the app does. This shows each query's own cost.
- **Concurrent**: several simulated users loading the trainer list, a trainer page (the trainer, then its inventory, feats, pokemon, and batched pokemon data in parallel), and a fakemon page, all at once. This shows behavior under contention.

Calls go through the anon role, which has the same 3 second `statement_timeout` as production, so timeouts show up as errors (code `57014`).

The data shape is configured in `config.ts`. The number of fakemon evolutions is a guess.
