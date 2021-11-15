const staticQR = ""
const assests = [
	"/",
	"/index.html",
	"/css/style.css",
	"/js/app.js",
	"",
	"",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticQR).then(cache => {
			cache.addAll(assests)
		})
	)
})

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})




