// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var CACHE_NAME = 'my-site-cache-v6';
var urlsToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/main.css',
  '/responsive.css',
  '/favicon.ico',
  '/images/city.png',
  '/images/cloudy.png',
  '/images/dog.jpg',
  '/images/rain.png',
  '/images/sunny.png',
  '/images/weather.png',
  '/images/Sun-PNG-Image-192x192_icon.png'
];

self.addEventListener('install', function(event) {
	self.skipWaiting();
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
	  event.waitUntil(
			    caches.keys().then(function(cacheNames) {
			      return Promise.all(
			        cacheNames.map(function(cacheName) {
			          if (CACHE_NAME.indexOf(cacheName) === -1) {
			            console.log('Deleting old cache files '+cacheName);  
			            return caches.delete(cacheName);
			          }
			        })
			      );
			    })
			  );
			  console.log('Hurray it is Finally active. Ready to start serving content!');  
			  return self.clients.claim();

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});