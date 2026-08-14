# Localization

Poké5e uses Inlang/Paraglide. English (`en`) is the base and fallback locale; UI messages live in `messages/{locale}.json`. Routes are locale-prefixed for non-English languages, so a selected language survives reloads and links without browser storage.

Domain data uses stable English IDs. Locale overlays in `static/data/{locale}` are merged by `id`; missing files, entities, and properties fall back to English. Whenever a merge replaces an entity's `name`, the English name is added to that entity's `aliases` so localized lists can be searched in either language. Overlays never need to declare this themselves; any `aliases` they do declare are kept alongside it.

## Canonical Pokémon names

Official Pokémon names come from the name tables in the [PokéAPI database CSV exports](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv). They are names only, not Pokédex or move prose. Run:

```sh
pnpm localization:canonical
```

The command requires network access and writes two things, both machine-owned:

- **Type names**, into the `canonical` section of every `messages/{locale}.json`. Read them through `typeName()` rather than `m` directly, so the type list and the message keys stay in one place.
- **Entity names** for species, moves, abilities, and items, into `static/data/{locale}` — but only for the locales in the script's `DATA_LOCALES`. Locales with hand-written overlays must stay out of that list, since generating one replaces the whole file.

The `canonical` section is written for *every* locale, filling gaps with the English name where PokéAPI has no entry (Portuguese has no type names at all; Spanish is missing one). This is what keeps it safe from `pnpm machine-translate`, which translates any key whose value is missing or empty and cannot be told to skip a section. `canonical-names.test.ts` fails if a locale is missing a key.

The PokéAPI commit is pinned in the script; update that constant deliberately and review the generated diff when refreshing the data. Re-running is idempotent.

## Adding a locale

Add it to `project.inlang/settings.json`, create its message file, add its PokéAPI `languages.csv` id to `LANGUAGE_IDS` in the generator, and run `pnpm localization:canonical`. Data overlays under `static/data/{locale}` are optional; keep IDs unchanged, since the shared merge helper provides property-level English fallback and English-name aliases. Add representative message, entity-name, alias-search, and fallback tests.
