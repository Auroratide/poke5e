# Migration Testing

To test a migration locally:

1. Create the migration and put it in a folder called `candidates`.
2. Replace the content of `test/before.js` with the content of `test/after.js`.
3. Write a new `test/after.js` to match what you expect the result of the migration to be.
4. Run `pnpm migrate:test:local`
5. Tweak the migration until your test passes.
6. Run the journey test with `pnpm test`. **Important: Make sure there are no local changes to the web code!**
7. When done, commit and push! The pipeline will run the migration and the journey test after.

## Strategy

Once a migration runs, they can't be easily undone. This is why it is extremely important to test them!

Part of testing a migration is not just ensuring the migration worked, but that it's **backward compatible**. Notably, it is impossible to update the database _and_ the live website simultaneously. Therefore, any change to the database must continue to work with the live website as it was, and vice versa.

My testing strategy accounts for this:

1. Before the migration is run, run the `before` test.
2. Run the migration.
3. Run the `before` test _again_, for backward compatibility.
4. Run the `after` test, to ensure the migration worked.
5. Run the journey tests against the old website, again for backward compatibility _and_ integration.

## Notes about this

This uses a library called `postgres-migrations` to run migrations easily. Unfortunately, the library is also unmaintained and lacks a couple of useful features (dry running, and running migrations only up to a point).

This is why the testing code is a little wonky tonky, and why a `candidates` folder exists. We have to move the tested migration in and out of the `migrations` folder to test the result of the delta.

I don't plan on moving away from `postgres-migrations`, because it would mean re-jigging the `migrations` table, and I don't wanna deal with that ever.
