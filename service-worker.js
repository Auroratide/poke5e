const s = [
  "/poke5e/_app/immutable/start-7f9f3da0.js",
  "/poke5e/_app/immutable/components/pages/_layout.svelte-8e954073.js",
  "/poke5e/_app/immutable/assets/_layout-9a3e7f30.css",
  "/poke5e/_app/immutable/components/pages/_error.svelte-067cf4ae.js",
  "/poke5e/_app/immutable/assets/_error-a83e7ca7.css",
  "/poke5e/_app/immutable/components/pages/_page.svelte-849d2408.js",
  "/poke5e/_app/immutable/assets/_page-efac4ea3.css",
  "/poke5e/_app/immutable/components/pages/moves/_page.svelte-51f4cc03.js",
  "/poke5e/_app/immutable/components/pages/moves/_id_/_page.svelte-126b4232.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_page.svelte-24b7c054.js",
  "/poke5e/_app/immutable/components/pages/pokemon/_id_/_page.svelte-3c62f034.js",
  "/poke5e/_app/immutable/assets/_page-369a699f.css",
  "/poke5e/_app/immutable/components/pages/tms/_page.svelte-170438e0.js",
  "/poke5e/_app/immutable/components/pages/tms/_id_/_page.svelte-8b043e1f.js",
  "/poke5e/_app/immutable/assets/_page-5a95889c.css",
  "/poke5e/_app/immutable/modules/pages/_layout.ts-5337e018.js",
  "/poke5e/_app/immutable/modules/pages/moves/_page.ts-0cec8ba2.js",
  "/poke5e/_app/immutable/modules/pages/moves/_id_/_page.ts-ffe9bf39.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_page.ts-d1535dd1.js",
  "/poke5e/_app/immutable/modules/pages/pokemon/_id_/_page.ts-66206197.js",
  "/poke5e/_app/immutable/modules/pages/tms/_page.ts-00858c46.js",
  "/poke5e/_app/immutable/modules/pages/tms/_id_/_page.ts-02029a5c.js",
  "/poke5e/_app/immutable/chunks/singletons-7fb9f807.js",
  "/poke5e/_app/immutable/chunks/paths-6cd3a76e.js",
  "/poke5e/_app/immutable/chunks/index-cd82e938.js",
  "/poke5e/_app/immutable/chunks/control-03134885.js",
  "/poke5e/_app/immutable/chunks/index-291bbab1.js",
  "/poke5e/_app/immutable/chunks/store-74d29f79.js",
  "/poke5e/_app/immutable/chunks/store-4e1d3a02.js",
  "/poke5e/_app/immutable/chunks/_layout-e6c3be0a.js",
  "/poke5e/_app/immutable/chunks/Title-eb0e13bc.js",
  "/poke5e/_app/immutable/chunks/Pokeball-99626775.js",
  "/poke5e/_app/immutable/assets/Pokeball-92bff52b.css",
  "/poke5e/_app/immutable/chunks/Hit-2f56aa66.js",
  "/poke5e/_app/immutable/assets/Hit-2d3f7d4a.css",
  "/poke5e/_app/immutable/chunks/Disc-1ebab146.js",
  "/poke5e/_app/immutable/assets/Disc-6f138303.css",
  "/poke5e/_app/immutable/chunks/_layout-501e5c61.js",
  "/poke5e/_app/immutable/assets/_layout-08fd4b5a.css",
  "/poke5e/_app/immutable/chunks/Loader-c4ac6f74.js",
  "/poke5e/_app/immutable/assets/Loader-8652cbf3.css",
  "/poke5e/_app/immutable/chunks/string-58a72b81.js",
  "/poke5e/_app/immutable/chunks/filter-513504b5.js",
  "/poke5e/_app/immutable/chunks/_page-ae11be11.js",
  "/poke5e/_app/immutable/chunks/PokeMove-89d77747.js",
  "/poke5e/_app/immutable/assets/PokeMove-1413d279.css",
  "/poke5e/_app/immutable/chunks/TypeTag-a75711ac.js",
  "/poke5e/_app/immutable/assets/TypeTag-0063f7d6.css",
  "/poke5e/_app/immutable/chunks/_page-40b5db35.js",
  "/poke5e/_app/immutable/chunks/index-e9ed3a62.js",
  "/poke5e/_app/immutable/chunks/_layout-89ca4272.js",
  "/poke5e/_app/immutable/chunks/_page-699e0296.js",
  "/poke5e/_app/immutable/chunks/_page-38f7359a.js",
  "/poke5e/_app/immutable/chunks/_layout-d40f0282.js",
  "/poke5e/_app/immutable/chunks/_page-4346aaf4.js",
  "/poke5e/_app/immutable/chunks/_page-7e9cb6b9.js",
  "/poke5e/_app/immutable/chunks/0-066a0f22.js",
  "/poke5e/_app/immutable/chunks/1-b9158c61.js",
  "/poke5e/_app/immutable/chunks/2-6ecd3eac.js",
  "/poke5e/_app/immutable/chunks/3-28d855f9.js",
  "/poke5e/_app/immutable/chunks/4-91a7126f.js",
  "/poke5e/_app/immutable/chunks/5-f854dcb1.js",
  "/poke5e/_app/immutable/chunks/6-c961a507.js",
  "/poke5e/_app/immutable/chunks/7-bbf8e04c.js",
  "/poke5e/_app/immutable/chunks/8-a2108b9b.js"
], m = "1669429422729", p = `poke5e-${m}`, t = async () => {
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
