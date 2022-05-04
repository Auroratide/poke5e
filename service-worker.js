const build = [
  "/poke5e/_app/start-68fb0e40.js",
  "/poke5e/_app/pages/__layout.svelte-11d8cd20.js",
  "/poke5e/_app/assets/pages/__layout.svelte-0a44f995.css",
  "/poke5e/_app/pages/__error.svelte-5949676c.js",
  "/poke5e/_app/assets/pages/__error.svelte-9bd87145.css",
  "/poke5e/_app/pages/index.svelte-6db1949f.js",
  "/poke5e/_app/assets/pages/index.svelte-7e41303c.css",
  "/poke5e/_app/pages/moves/_id_.svelte-5066f5ee.js",
  "/poke5e/_app/pages/moves/index.svelte-00b210c4.js",
  "/poke5e/_app/pages/pokemon/_id_.svelte-4b0bdc59.js",
  "/poke5e/_app/assets/pages/pokemon/_id_.svelte-f4068316.css",
  "/poke5e/_app/pages/pokemon/index.svelte-2e3678d3.js",
  "/poke5e/_app/pages/tms/_id_.svelte-84bafa9d.js",
  "/poke5e/_app/assets/pages/tms/_id_.svelte-d9b4bee3.css",
  "/poke5e/_app/pages/tms/index.svelte-cfb52e84.js",
  "/poke5e/_app/chunks/paths-a68037f4.js",
  "/poke5e/_app/chunks/index-616296c3.js",
  "/poke5e/_app/chunks/store-881072a6.js",
  "/poke5e/_app/chunks/store-b6a5922a.js",
  "/poke5e/_app/chunks/Title-d04f9dab.js",
  "/poke5e/_app/chunks/Pokeball-c6cd3b66.js",
  "/poke5e/_app/assets/Pokeball-cdf68179.css",
  "/poke5e/_app/chunks/Hit-1e1a54d6.js",
  "/poke5e/_app/assets/Hit-aac29686.css",
  "/poke5e/_app/chunks/Disc-3c3a700e.js",
  "/poke5e/_app/assets/Disc-5f8121db.css",
  "/poke5e/_app/chunks/_layout-c0b6afd6.js",
  "/poke5e/_app/assets/_layout-6b0d86bd.css",
  "/poke5e/_app/chunks/PokeMove-38352db5.js",
  "/poke5e/_app/assets/PokeMove-092097c9.css",
  "/poke5e/_app/chunks/Loader-b8e6e374.js",
  "/poke5e/_app/assets/Loader-762b3015.css",
  "/poke5e/_app/chunks/TypeTag-1c879e8d.js",
  "/poke5e/_app/assets/TypeTag-d619e9f6.css",
  "/poke5e/_app/chunks/string-78f0a8b9.js",
  "/poke5e/_app/chunks/filter-b6f3cb86.js",
  "/poke5e/_app/chunks/_layout-bc8a00f4.js",
  "/poke5e/_app/chunks/_layout-d4dea994.js"
];
const version = "1651690087961";
const cacheName = `poke5e-${version}`;
const install = async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(build);
};
self.addEventListener("install", (e) => e.waitUntil(install()));
const activate = async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => {
    if (key === cacheName)
      return;
    return caches.delete(key);
  }));
};
self.addEventListener("activate", (e) => e.waitUntil(activate()));
self.addEventListener("fetch", (e) => {
});
