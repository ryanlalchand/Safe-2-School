if (!self.define) {
  let e,
    t = {};
  const s = (s, r) => (
    (s = new URL(s + ".js", r).href),
    t[s] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = t), document.head.appendChild(e);
        } else (e = s), importScripts(s), t();
      }).then(() => {
        let e = t[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, i) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[o]) return;
    let n = {};
    const c = (e) => s(e, o),
      d = { module: { uri: o }, exports: n, require: c };
    t[o] = Promise.all(r.map((e) => d[e] || c(e))).then((e) => (i(...e), n));
  };
}
define(["./workbox-5d0b2bdf"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [{ url: "jsQR.js", revision: "c5749c2591188b6c833dbe21cfd56b04" }],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
