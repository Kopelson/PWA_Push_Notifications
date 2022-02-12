
const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html'
];

self.addEventListener('install', event => {
    console.log('Service worker install Event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
