const s = [
  "/poke5e/_app/immutable/assets/_layout-9a3e7f30.css",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/assets/Loader-63875752.css",
  "/poke5e/_app/immutable/assets/TypeTag-59509f45.css",
  "/poke5e/_app/immutable/assets/_page-4735017a.css",
  "/poke5e/_app/immutable/assets/TypeEffectiveness-53d08c0c.css",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/assets/_page-6e73c793.css",
  "/poke5e/_app/immutable/chunks/_page-afc94725.js",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-76d12a53.js",
  "/poke5e/_app/immutable/chunks/_page-1109c1be.js",
  "/poke5e/_app/immutable/chunks/0-8a1a6a0b.js",
  "/poke5e/_app/immutable/chunks/1-47c59dc3.js",
  "/poke5e/_app/immutable/chunks/_page-2587a511.js",
  "/poke5e/_app/immutable/chunks/4-76d74893.js",
  "/poke5e/_app/immutable/chunks/9-9a2645b7.js",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-b803f5af.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-2f9132e5.js",
  "/poke5e/_app/immutable/chunks/6-46c5e70e.js",
  "/poke5e/_app/immutable/chunks/7-e10cf6f5.js",
  "/poke5e/_app/immutable/chunks/8-7b34c258.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-823154e1.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-0b92f25e.js",
  "/poke5e/_app/immutable/chunks/3-d30b3d48.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-6fd9e2fb.js",
  "/poke5e/_app/immutable/chunks/_page-6b69af6d.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-2b7b1986.js",
  "/poke5e/_app/immutable/chunks/Title-3d3f0d75.js",
  "/poke5e/_app/immutable/chunks/shared-23917130.js",
  "/poke5e/_app/immutable/chunks/control-e7f5239e.js",
  "/poke5e/_app/immutable/chunks/filter-17340034.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-1b08e624.js",
  "/poke5e/_app/immutable/chunks/index-472b9f20.js",
  "/poke5e/_app/immutable/chunks/preload-helper-41c905a7.js",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-1919b9c0.js",
  "/poke5e/_app/immutable/chunks/index-a38d8c23.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-70699c37.js",
  "/poke5e/_app/immutable/chunks/_page-9fbe707b.js",
  "/poke5e/_app/immutable/chunks/2-4c879f9b.js",
  "/poke5e/_app/immutable/chunks/_page-0107073f.js",
  "/poke5e/_app/immutable/chunks/index-2f9fe195.js",
  "/poke5e/_app/immutable/chunks/Disc-7cc6273d.js",
  "/poke5e/_app/immutable/chunks/store-94738c57.js",
  "/poke5e/_app/immutable/chunks/_layout-d4829c1c.js",
  "/poke5e/_app/immutable/chunks/5-3e5b2f9e.js",
  "/poke5e/_app/immutable/chunks/store-e9c43a05.js",
  "/poke5e/_app/immutable/chunks/_layout-e169dcd7.js",
  "/poke5e/_app/immutable/chunks/singletons-8713c8cd.js",
  "/poke5e/_app/immutable/chunks/filter-f507ca1b.js",
  "/poke5e/_app/immutable/chunks/stores-375ad803.js",
  "/poke5e/_app/immutable/chunks/string-574587ae.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-134f934b.js",
  "/poke5e/_app/immutable/components/pages/_error.svelte-fad222e9.js",
  "/poke5e/_app/immutable/chunks/Pokeball-ab4846cb.js",
  "/poke5e/_app/immutable/chunks/Hit-90878151.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-3883cf83.js",
  "/poke5e/_app/immutable/chunks/Loader-8bc85b85.js",
  "/poke5e/_app/immutable/chunks/TypeTag-cd48f3d4.js",
  "/poke5e/_app/immutable/chunks/_layout-15885890.js",
  "/poke5e/_app/immutable/start-f57c7d3f.js",
  "/poke5e/_app/immutable/chunks/TypeEffectiveness-aa07f853.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-81b7e9a2.js",
  "/poke5e/_app/immutable/chunks/PokeMove-56a85a3e.js",
  "/poke5e/_app/immutable/components/pages/_page.svelte-93ea660e.js",
  "/poke5e/_app/immutable/chunks/_layout-f692822b.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-f6ef23ed.js",
  "/poke5e/_app/immutable/components/pages/trainers/_page.svelte-d570d277.js"
], m = "1673999779567", a = `poke5e-${m}`, t = async () => {
  await (await caches.open(a)).addAll(s);
};
self.addEventListener("install", (e) => e.waitUntil(t()));
const o = async () => {
  const e = await caches.keys();
  await Promise.all(e.map((p) => {
    if (p !== a)
      return caches.delete(p);
  }));
};
self.addEventListener("activate", (e) => e.waitUntil(o()));
self.addEventListener("fetch", (e) => {
});
