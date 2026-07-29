// Aptuvia · service worker mínimo.
// Objetivo: cumplir el requisito de instalación como app (tener un handler de
// fetch) SIN cachear la aplicación, para no servir nunca versiones viejas tras
// un deploy. Solo intervenimos en la navegación de la propia web para dar una
// página de cortesía sin conexión; todo lo demás (Supabase, CDNs, POST...) pasa
// tal cual, sin tocar.

const OFFLINE_HTML = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sin conexion</title><body style="font-family:system-ui,-apple-system,sans-serif;color:#2e3163;text-align:center;padding:48px 24px"><h1 style="font-size:1.2rem;margin:0 0 8px">Sin conexion</h1><p style="color:#555">Aptuvia necesita internet. Vuelve a intentarlo cuando tengas conexion.</p></body>';

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(function () {
        return new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      })
    );
  }
});
