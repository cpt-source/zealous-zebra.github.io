const CACHE_PREFIX = 'v3d-app-cache';
const CACHE_HASH = '59b5e750ac';
const CACHE_VERSION = 'v1';

const ASSETS = [
    'basis_transcoder.js',
    'basis_transcoder.wasm',
    'bfont.woff',
    'box_signs.jpg',
    'box_signs.ktx2',
    'cardboard_diffuse.jpg',
    'e-learning.bin.xz',
    'e-learning.css',
    'e-learning.gltf.xz',
    'e-learning.html',
    'e-learning.js',
    'environment.hdr',
    'environment.hdr.xz',
    'grid.ktx2',
    'grid.png',
    'logo.ktx2',
    'logo.png',
    'noise.ktx2',
    'noise.png',
    'opentype.js',
    'Rubik-Regular.ttf',
    'v3d.js',
    'visual_logic.js',
    'fonts/Rubik-Regular.ttf',
    'media/android-chrome-192x192.png',
    'media/android-chrome-512x512.png',
    'media/apple-touch-icon.png',
    'media/favicon-16x16.png',
    'media/favicon-32x32.png',
    'media/favicon-48x48.png',
    'media/fullscreen_close.svg',
    'media/fullscreen_open.svg',
    'media/manifest.json',
    'media/safari-pinned-tab.svg',
    'sounds/cooler_working.mp3',
    'sounds/environment_music.mp3',
    'sounds/flicker.mp3',
    'sounds/stage_1.mp3',
    'sounds/stage_10.mp3',
    'sounds/stage_2.mp3',
    'sounds/stage_3.mp3',
    'sounds/stage_4.mp3',
    'sounds/stage_5.mp3',
    'sounds/stage_6.mp3',
    'sounds/stage_7.mp3',
    'sounds/stage_8.mp3',
    'sounds/stage_9.mp3',
    'sounds/step_0_voice.mp3',
    'sounds/step_10_voice.mp3',
    'sounds/step_1_voice.mp3',
    'sounds/step_2_voice.mp3',
    'sounds/step_3_voice.mp3',
    'sounds/step_4_voice.mp3',
    'sounds/step_5_voice.mp3',
    'sounds/step_6_voice.mp3',
    'sounds/step_7_voice.mp3',
    'sounds/step_8_voice.mp3',
    'sounds/step_9_voice.mp3',
];

const cacheName = () => {
    return `${CACHE_PREFIX}-${CACHE_HASH}-${CACHE_VERSION}`;
}

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName()).then(cache => {
        return cache.addAll(ASSETS);
    }));
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [cacheName()];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => {
        return (key.includes(CACHE_HASH) && !cacheKeepList.includes(key));
    });
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener('activate', (event) => {
    event.waitUntil(deleteOldCaches());
});

const handleCached = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache)
        return responseFromCache;
    return fetch(request);
};

self.addEventListener('fetch', (event) => {
    event.respondWith(handleCached(event.request));
});
