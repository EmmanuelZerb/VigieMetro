const C='vigie-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(
  caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))
  .then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(
    caches.open(C).then(async c=>{
      const m=await c.match(e.request);
      const f=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>m);
      return m||f}))});
      