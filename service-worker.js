const s = [
  "/poke5e/_app/immutable/assets/_layout-dcc04b8a.css",
  "/poke5e/_app/immutable/assets/Loader-63875752.css",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/assets/string-53d08c0c.css",
  "/poke5e/_app/immutable/assets/_page-0a1d8676.css",
  "/poke5e/_app/immutable/assets/TypeTag-59509f45.css",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/assets/_page-4110a05a.css",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/chunks/stores-48758ac2.js",
  "/poke5e/_app/immutable/chunks/Title-5bb3117e.js",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-e22b7389.js",
  "/poke5e/_app/immutable/chunks/string-574587ae.js",
  "/poke5e/_app/immutable/chunks/filter-17340034.js",
  "/poke5e/_app/immutable/chunks/_page-9fbe707b.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-ff88b87c.js",
  "/poke5e/_app/immutable/chunks/index-2f9fe195.js",
  "/poke5e/_app/immutable/chunks/_page-6b69af6d.js",
  "/poke5e/_app/immutable/chunks/filter-f04b55bd.js",
  "/poke5e/_app/immutable/chunks/3-22fa3bf4.js",
  "/poke5e/_app/immutable/chunks/_page-2587a511.js",
  "/poke5e/_app/immutable/chunks/4-5556b1a4.js",
  "/poke5e/_app/immutable/chunks/5-b4ae1132.js",
  "/poke5e/_app/immutable/chunks/6-ccdbf9da.js",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-b803f5af.js",
  "/poke5e/_app/immutable/chunks/9-13e8630e.js",
  "/poke5e/_app/immutable/chunks/8-b2d0b1ba.js",
  "/poke5e/_app/immutable/chunks/0-022fa7df.js",
  "/poke5e/_app/immutable/chunks/_page-0107073f.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-4e1f9af2.js",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-e511c13b.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-2b7b1986.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-8265b631.js",
  "/poke5e/_app/immutable/chunks/7-267f000f.js",
  "/poke5e/_app/immutable/chunks/_page-afc94725.js",
  "/poke5e/_app/immutable/chunks/_page-1109c1be.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-6fe16dd2.js",
  "/poke5e/_app/immutable/chunks/_layout-0f4b6d83.js",
  "/poke5e/_app/immutable/chunks/TypeTag-dbd500ac.js",
  "/poke5e/_app/immutable/chunks/1-2420db35.js",
  "/poke5e/_app/immutable/chunks/string-fad078c5.js",
  "/poke5e/_app/immutable/chunks/Loader-8c58bf93.js",
  "/poke5e/_app/immutable/components/pages/_error.svelte-5b42b37e.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-0b92f25e.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-1b08e624.js",
  "/poke5e/_app/immutable/components/pages/_page.svelte-641d318d.js",
  "/poke5e/_app/immutable/chunks/Pokeball-e0cb5b7d.js",
  "/poke5e/_app/immutable/chunks/Disc-2256efbe.js",
  "/poke5e/_app/immutable/chunks/Hit-19bb3676.js",
  "/poke5e/_app/immutable/chunks/shared-23917130.js",
  "/poke5e/_app/immutable/chunks/control-e7f5239e.js",
  "/poke5e/_app/immutable/chunks/index-ab0cb1b5.js",
  "/poke5e/_app/immutable/chunks/_layout-988dcd4c.js",
  "/poke5e/_app/immutable/chunks/index-1526d154.js",
  "/poke5e/_app/immutable/chunks/store-dab42a82.js",
  "/poke5e/_app/immutable/chunks/PokeMove-b5199e00.js",
  "/poke5e/_app/immutable/start-63727215.js",
  "/poke5e/_app/immutable/chunks/2-cfb5c742.js",
  "/poke5e/_app/immutable/chunks/store-66eb34b4.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-6fd9e2fb.js",
  "/poke5e/_app/immutable/chunks/singletons-97ccd044.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-2f9132e5.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-823154e1.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-3a5026dc.js",
  "/poke5e/_app/immutable/chunks/_layout-e169dcd7.js",
  "/poke5e/_app/immutable/chunks/preload-helper-41c905a7.js",
  "/poke5e/_app/immutable/chunks/_layout-3a448a45.js",
  "/poke5e/_app/immutable/components/pages/trainers/_page.svelte-58d066b0.js"
], m = "1674275003883", p = `poke5e-${m}`, t = async () => {
  await (await caches.open(p)).addAll(s);
};
self.addEventListener("install", (e) => e.waitUntil(t()));
const o = async () => {
  const e = await caches.keys();
  await Promise.all(e.map((a) => {
    if (a !== p)
      return caches.delete(a);
  }));
};
self.addEventListener("activate", (e) => e.waitUntil(o()));
self.addEventListener("fetch", (e) => {
});
