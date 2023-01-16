const s = [
  "/poke5e/_app/immutable/assets/_layout-9a3e7f30.css",
  "/poke5e/_app/immutable/assets/_page-c99a3768.css",
  "/poke5e/_app/immutable/assets/TypeEffectiveness-53d08c0c.css",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/assets/Loader-63875752.css",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/assets/TypeTag-59509f45.css",
  "/poke5e/_app/immutable/assets/_page-4735017a.css",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/chunks/filter-17340034.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-60c867ac.js",
  "/poke5e/_app/immutable/chunks/_page-0107073f.js",
  "/poke5e/_app/immutable/chunks/index-2f9fe195.js",
  "/poke5e/_app/immutable/chunks/_page-9fbe707b.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-f5bfc02f.js",
  "/poke5e/_app/immutable/chunks/filter-f507ca1b.js",
  "/poke5e/_app/immutable/chunks/_page-6b69af6d.js",
  "/poke5e/_app/immutable/chunks/_page-afc94725.js",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-409f9124.js",
  "/poke5e/_app/immutable/chunks/1-557e76c7.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-2b7b1986.js",
  "/poke5e/_app/immutable/chunks/index-1bf4116b.js",
  "/poke5e/_app/immutable/chunks/3-3c7b5e46.js",
  "/poke5e/_app/immutable/chunks/0-1b806692.js",
  "/poke5e/_app/immutable/chunks/_page-2587a511.js",
  "/poke5e/_app/immutable/chunks/4-ad61fbb4.js",
  "/poke5e/_app/immutable/chunks/_page-1109c1be.js",
  "/poke5e/_app/immutable/chunks/2-d0fb1d52.js",
  "/poke5e/_app/immutable/chunks/5-ac210d0f.js",
  "/poke5e/_app/immutable/chunks/6-fa7f7344.js",
  "/poke5e/_app/immutable/chunks/7-a0b02dc0.js",
  "/poke5e/_app/immutable/chunks/8-6d5198ba.js",
  "/poke5e/_app/immutable/chunks/9-5e89c00c.js",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-b803f5af.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-2f9132e5.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-6fd9e2fb.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-823154e1.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-0b92f25e.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-1b08e624.js",
  "/poke5e/_app/immutable/chunks/store-48df5be2.js",
  "/poke5e/_app/immutable/chunks/singletons-8c0a09f7.js",
  "/poke5e/_app/immutable/chunks/shared-23917130.js",
  "/poke5e/_app/immutable/chunks/index-d0a8ca4a.js",
  "/poke5e/_app/immutable/chunks/Title-8042d680.js",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-a982a287.js",
  "/poke5e/_app/immutable/chunks/string-574587ae.js",
  "/poke5e/_app/immutable/chunks/control-e7f5239e.js",
  "/poke5e/_app/immutable/chunks/preload-helper-41c905a7.js",
  "/poke5e/_app/immutable/chunks/_layout-e169dcd7.js",
  "/poke5e/_app/immutable/chunks/stores-b1e6f7ac.js",
  "/poke5e/_app/immutable/start-b37b179b.js",
  "/poke5e/_app/immutable/chunks/store-ae936c07.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-0361c5f2.js",
  "/poke5e/_app/immutable/chunks/Hit-35629667.js",
  "/poke5e/_app/immutable/components/pages/_error.svelte-a1700385.js",
  "/poke5e/_app/immutable/components/pages/_page.svelte-f19f789e.js",
  "/poke5e/_app/immutable/chunks/TypeTag-814ed812.js",
  "/poke5e/_app/immutable/chunks/_layout-2519f4eb.js",
  "/poke5e/_app/immutable/chunks/TypeEffectiveness-aa614788.js",
  "/poke5e/_app/immutable/chunks/PokeMove-f429b86f.js",
  "/poke5e/_app/immutable/chunks/_layout-bed0506c.js",
  "/poke5e/_app/immutable/chunks/Disc-972ee69c.js",
  "/poke5e/_app/immutable/chunks/Pokeball-8af4fd51.js",
  "/poke5e/_app/immutable/chunks/_layout-ae545a22.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-d11c92aa.js",
  "/poke5e/_app/immutable/chunks/Loader-4085da50.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-c151f518.js",
  "/poke5e/_app/immutable/components/pages/trainers/_page.svelte-d3103045.js"
], m = "1673906515289", p = `poke5e-${m}`, t = async () => {
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
