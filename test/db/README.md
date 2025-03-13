# Testing Migrations

1. Replace the contents of `before.test.ts` with the contents of `after.test.ts`
2. Update `after.test.ts` with the changes expected after the migration
3. Run the tests (`pnpm test:db`) and ensure that only `after.test.ts` fails
4. Create the migration (`pnpm supabase migration new name_of_migration`)
5. Write the migration
6. Test until passing (`pnpm test:db`)

## Why Before and After

We want to create a **chain of compatibility**. Since database changes cannot happen at the exact same time web changes happen, there will always be a period of time where the website is calling the database api _as it was_ rather than _as it now is_. Therefore, every migration needs to be made in a backward compatible way.

By running both `before` and `after` tests after the migration, we confirm that the database state works for both versions of the app.

> [!NOTE]
> Once the old `before` tests are replaced, there is no guarantee of backwards compatibility. That is, we promise only to be compatible one version back of the database.

## The Initial Migration

Previously, I had used `postgres-migrations` to manage migrations manually. In the effort to be able to run the _entire_ supabase environment locally and not just the database, I'm now using supabase's in-built migration management.

The first migration is a snapshot of all the previously made migrations under the old system.
