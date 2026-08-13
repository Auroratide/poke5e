# Localization

Poké5e uses Inlang/Paraglide. English (`en`) is the base and fallback locale; UI messages live in `messages/{locale}.json`. Routes are locale-prefixed for non-English languages, so a selected language survives reloads and links without browser storage.

Domain data uses stable English IDs. Locale overlays in `static/data/{locale}` are merged by `id`; missing files, entities, and properties fall back to English. Whenever a merge replaces an entity's `name`, the English name is added to that entity's `aliases` so localized lists can be searched in either language. Overlays never need to declare this themselves; any `aliases` they do declare are kept alongside it.

## Canonical Pokémon names

German species, move, ability, item, type, and nature names are generated from the German (`language_id = 6`) name tables in the [PokéAPI database CSV exports](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv). They contain names only, not Pokédex or move prose. Run:

```sh
pnpm localization:canonical
```

The command requires network access and rewrites the generated German JSON files. Its PokéAPI commit is pinned in the script; update that constant deliberately and review the generated diff when refreshing the data.

## Adding a locale

Add it to `project.inlang/settings.json`, create its message file, and add data overlays under `static/data/{locale}`. Keep IDs unchanged; the shared merge helper provides property-level English fallback and English-name aliases. Add representative message, entity-name, alias-search, and fallback tests.
