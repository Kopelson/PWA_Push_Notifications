# PWA_Push_Notifications

Tutorial playlist on PWA's, by Google Chrome Developers:
https://www.youtube.com/playlist?list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh

## Service Workers

### What is a service worker?
    -A service worker is a client side programmable proxy between your web app and the outside.
    -Service workers are a type of web worker, and each executes its script separately from the main browser thread.
    -Your service worker has a lifecycle independent of your web app.
        *it can receive messages when not active, either because your application is in the background, not open, or the browser is closed.


### Register the Service Worker

    inside main.js

   ```

   if(!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return;
    }
    navigator.serviceWorker.register('/service-worker.js)
        .then(function(registration){
            console.log('SW registered! Scope is:'), registration.scope);
        }); //.catch a registration error

    ```
        

    This should sit in the root js file to cover the scope of the whole app.

    inside sw.js


    ```
    
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
    
    ```

## Manifest.json    

```

{
  "short_name": "PWA Notifications",
  "name": "Progressive Web App Notifications",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "./index.html?from=homescreen",
  "display": "standalone",
  "theme_color": "#1c05f3",
  "background_color": "#1c05f3"
}

```
