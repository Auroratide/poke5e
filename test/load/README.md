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