// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '140214647064'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  let notificationTitle = 'Hi there!';
  let notificationOptions = {
    body: 'We have a new message for you.',
    icon: '/images/baby-50.jpg',
    actions: [  
    	   {action: 'view', title: '👍 I Like it!' }]  
  };
  // Customize notification here
  if(payload && payload.data){
	  notificationTitle = payload.data.title;
	  notificationOptions.body = payload.data.body;
  }
  

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener('notificationclick', function(event) {  
	 

	  event.notification.close();

	  if (event.action === 'view') {  
		  clients.openWindow("/index.html"); 
	  }  
	  else if (event.action === 'reply') {  
		  clients.openWindow("/index.html");  
	  } else  {  
		  clients.openWindow("/index.html");  
	  }  
	  
	}, false);
/*
self.addEventListener('push', function(event) {  
	 console.log('[firebase-messaging-sw.js] Received Foreground message ');
	  // Customize notification here
	  const notificationTitle = 'Foreground Message Title';
	  const notificationOptions = {
	    body: 'Foreground Message body.',
	    icon: '/images/baby-50.jpg'
	  };


	  event.waitUntil(  
	    self.registration.showNotification(notificationTitle,  	      notificationOptions)  
	  );  
	});*/
// [END background_handler]