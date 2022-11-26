const s = [
  "/poke5e/_app/immutable/start-798f534c.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-585e353d.js",
  "/poke5e/_app/immutable/assets/_layout-9a3e7f30.css",
  "/poke5e/_app/immutable/components/pages/_error.svelte-fe2f0ec3.js",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/components/pages/_page.svelte-ac9b872e.js",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-88d7126a.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-8312b94f.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-51ad7b9d.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-d79827ec.js",
  "/poke5e/_app/immutable/assets/_page-369a699f.css",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-c49caf23.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-a82c6a1b.js",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-5337e018.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-d12158a0.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-942679ff.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-2e910b8d.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-54e225ac.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-3b36e729.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-d53be6b5.js",
  "/poke5e/_app/immutable/chunks/singletons-5b1f7c3b.js",
  "/poke5e/_app/immutable/chunks/paths-1397b395.js",
  "/poke5e/_app/immutable/chunks/index-2e36cecb.js",
  "/poke5e/_app/immutable/chunks/control-aa894445.js",
  "/poke5e/_app/immutable/chunks/index-d8f1c416.js",
  "/poke5e/_app/immutable/chunks/store-41a0f579.js",
  "/poke5e/_app/immutable/chunks/store-08e0f3b3.js",
  "/poke5e/_app/immutable/chunks/_layout-e6c3be0a.js",
  "/poke5e/_app/immutable/chunks/Title-e088a64b.js",
  "/poke5e/_app/immutable/chunks/Pokeball-581b3399.js",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/chunks/Hit-5eaa6b3e.js",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/chunks/Disc-fbc93959.js",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/chunks/_layout-281598c3.js",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/chunks/Loader-85afe2bd.js",
  "/poke5e/_app/immutable/assets/Loader-8652cbf3.css",
  "/poke5e/_app/immutable/chunks/string-58a72b81.js",
  "/poke5e/_app/immutable/chunks/filter-513504b5.js",
  "/poke5e/_app/immutable/chunks/_page-f4ee2481.js",
  "/poke5e/_app/immutable/chunks/PokeMove-fe0ab494.js",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/chunks/TypeTag-ee84ef32.js",
  "/poke5e/_app/immutable/assets/TypeTag-0063f7d6.css",
  "/poke5e/_app/immutable/chunks/_page-da0c91e0.js",
  "/poke5e/_app/immutable/chunks/index-c6486264.js",
  "/poke5e/_app/immutable/chunks/_layout-8d68d020.js",
  "/poke5e/_app/immutable/chunks/_page-ab3249dd.js",
  "/poke5e/_app/immutable/chunks/_page-480aca8f.js",
  "/poke5e/_app/immutable/chunks/_layout-d6880994.js",
  "/poke5e/_app/immutable/chunks/_page-707e0d71.js",
  "/poke5e/_app/immutable/chunks/_page-65226de7.js",
  "/poke5e/_app/immutable/chunks/0-4ea24991.js",
  "/poke5e/_app/immutable/chunks/1-b87946c6.js",
  "/poke5e/_app/immutable/chunks/2-b1441137.js",
  "/poke5e/_app/immutable/chunks/3-c54d5335.js",
  "/poke5e/_app/immutable/chunks/4-cef4f232.js",
  "/poke5e/_app/immutable/chunks/5-60230f2f.js",
  "/poke5e/_app/immutable/chunks/6-f87878bc.js",
  "/poke5e/_app/immutable/chunks/7-2894141b.js",
  "/poke5e/_app/immutable/chunks/8-32371a40.js"
], m = "1669470615130", p = `poke5e-${m}`, t = async () => {
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
