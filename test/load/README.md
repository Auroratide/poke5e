# Load Testing

This seeds the local docker database with a bunch of data, then runs the RPC queries to see how long they take. The goal is to use this to compare before-and-after performance of the database.

## Running

```sh
pnpm services:start
pnpm supabase db reset   # start from a clean database
pnpm test:load
```

For now, this merely runs requests in sequence. In the future, this could become genuine load tests with an actual SLA.

## Results

Results are put in the `results` folder, and show the min, avg, and max times for each query, along with any errors that may have happened.

Seeing a time of 1ms is generally "perfect" time. Anything above 50ms is basically a performance problem that is greatly exascerbated in prod.

## Why

This was written in response a plethora of "failed to fetch" errors in production. These seem to be caused by two things:

1. Too many queries
2. Too slow queries

Therefore, it was imperative to improve the performance of the queries, both by consolidating them, and them by tuning their speed.