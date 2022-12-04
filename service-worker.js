const s = [
  "/poke5e/_app/immutable/start-b81797f0.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-8b9a06c4.js",
  "/poke5e/_app/immutable/assets/_layout-9a3e7f30.css",
  "/poke5e/_app/immutable/components/pages/_error.svelte-a4fc9446.js",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/components/pages/_page.svelte-3abc8407.js",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-b8e4049f.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-43033c1c.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-d1ef5ef7.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-fc7c52d6.js",
  "/poke5e/_app/immutable/assets/_page-4735017a.css",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-05cde5e8.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-52df74ae.js",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/components/pages/trainers/_page.svelte-c0c56135.js",
  "/poke5e/_app/immutable/assets/_page-6f3199c8.css",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-5337e018.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-d12158a0.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-942679ff.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-2e910b8d.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-54e225ac.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-3b36e729.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-d53be6b5.js",
  "/poke5e/_app/immutable/chunks/singletons-eb3c4a7b.js",
  "/poke5e/_app/immutable/chunks/paths-1397b395.js",
  "/poke5e/_app/immutable/chunks/index-bc8f2de2.js",
  "/poke5e/_app/immutable/chunks/control-aa894445.js",
  "/poke5e/_app/immutable/chunks/index-c39b3395.js",
  "/poke5e/_app/immutable/chunks/preload-helper-9b728935.js",
  "/poke5e/_app/immutable/chunks/store-4c82893c.js",
  "/poke5e/_app/immutable/chunks/store-08716c9b.js",
  "/poke5e/_app/immutable/chunks/_layout-e6c3be0a.js",
  "/poke5e/_app/immutable/chunks/stores-61502f38.js",
  "/poke5e/_app/immutable/chunks/Title-8b51fa1a.js",
  "/poke5e/_app/immutable/chunks/Pokeball-b48808da.js",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/chunks/Hit-1e291f85.js",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/chunks/Disc-640dda37.js",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/chunks/_layout-1bc2e29b.js",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/chunks/Loader-a2ac341f.js",
  "/poke5e/_app/immutable/assets/Loader-f0d835ef.css",
  "/poke5e/_app/immutable/chunks/string-58a72b81.js",
  "/poke5e/_app/immutable/chunks/filter-513504b5.js",
  "/poke5e/_app/immutable/chunks/_page-f4ee2481.js",
  "/poke5e/_app/immutable/chunks/PokeMove-94c3c6f3.js",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/chunks/TypeTag-232639a3.js",
  "/poke5e/_app/immutable/assets/TypeTag-59509f45.css",
  "/poke5e/_app/immutable/chunks/_page-da0c91e0.js",
  "/poke5e/_app/immutable/chunks/index-c6486264.js",
  "/poke5e/_app/immutable/chunks/_layout-6879c03f.js",
  "/poke5e/_app/immutable/chunks/filter-fd158039.js",
  "/poke5e/_app/immutable/chunks/_page-ab3249dd.js",
  "/poke5e/_app/immutable/chunks/TypeEffectiveness-053001cb.js",
  "/poke5e/_app/immutable/assets/TypeEffectiveness-53d08c0c.css",
  "/poke5e/_app/immutable/chunks/_page-480aca8f.js",
  "/poke5e/_app/immutable/chunks/_layout-3b15277c.js",
  "/poke5e/_app/immutable/chunks/_page-707e0d71.js",
  "/poke5e/_app/immutable/chunks/_page-65226de7.js",
  "/poke5e/_app/immutable/chunks/0-2d913f2f.js",
  "/poke5e/_app/immutable/chunks/1-52adcd8f.js",
  "/poke5e/_app/immutable/chunks/2-ebb699b9.js",
  "/poke5e/_app/immutable/chunks/3-3234acd2.js",
  "/poke5e/_app/immutable/chunks/4-6b12580f.js",
  "/poke5e/_app/immutable/chunks/5-c5851d19.js",
  "/poke5e/_app/immutable/chunks/6-bcb3c781.js",
  "/poke5e/_app/immutable/chunks/7-25461b3c.js",
  "/poke5e/_app/immutable/chunks/8-31395e47.js",
  "/poke5e/_app/immutable/chunks/9-2281c522.js"
], m = "1670162356831", a = `poke5e-${m}`, t = async () => {
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
