
// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyB7ynFRD5cAGszNGm9-GV711QzfkyEBnrY",
	    authDomain: "sandeep-responsive.firebaseapp.com",
	    databaseURL: "https://sandeep-responsive.firebaseio.com",
	    projectId: "sandeep-responsive",
	    storageBucket: "sandeep-responsive.appspot.com",
	    messagingSenderId: "140214647064"
	  };
	  firebase.initializeApp(config);
	  const messaging = firebase.messaging();  
	  getToken();
	  function getToken(){
		
			    messaging.getToken()
			    .then(function(refreshedToken) {
			      console.log('Token refreshed '+refreshedToken);
			     
			      //sendTokenToServer(refreshedToken);
			     
			    })
			    .catch(function(err) {
			      console.log('Unable to retrieve refreshed token## ', err);
			      //showToken('Unable to retrieve refreshed token ', err);
			    });
		
	  }  
// Register Service Worker
if('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  navigator.serviceWorker.register('service-worker.js').then(function(registration) {
	    // Registration was successful
	  }).catch(function(err) {
	    // registration failed :(
	    console.log('ServiceWorker registration failed: ', err);
	  });
	});
	
	

	
	  
	  messaging.onTokenRefresh(function() {
		  getToken();
	  }
			  
			  );
	  

	  
	
	  /*navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
		  serviceWorkerRegistration.pushManager.getSubscription().then(function(sub){
			
			  if (null != sub){
				  console.log('You have the permission for notifications !!!!!');
				  pushButton.disabled = true;
				  unsubscribeButton.disabled = !pushButton.disabled;
			  }else {
				  console.warn('you donot have the permission for notifications !!!!!');
				  pushButton.disabled = false;
				  unsubscribeButton.disabled = !pushButton.disabled;
			  }
			  
			  if(Notification.permission === 'denied') {
				 
		          // The user denied the notification permission which  
		          // means we failed to subscribe and the user will need  
		          // to manually change the notification permission to  
		          // subscribe to push messages  
		          console.warn('Permission for Notifications was denied');
		          pushButton.disabled = true;
		        }
		  });
	  });*/
	
	  
	  
}



// Setup Push notifications

var pushButton = document.querySelector('.js-push-button');
var unsubscribeButton = document.querySelector('.js-push-button-not');
pushButton.addEventListener('click', subscribe);
unsubscribeButton.addEventListener('click', unsubscribe);


function unsubscribe() {
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
		  serviceWorkerRegistration.pushManager.getSubscription().then(function(sub){
			  console.log("sub info ", sub);
			  if (null != sub){
				  sub.unsubscribe().then(function(successful) {
					  pushButton.disabled = false;
					  unsubscribeButton.disabled = !pushButton.disabled;
				    }).catch(function(e) {
				    	pushButton.disabled = true;
						  unsubscribeButton.disabled = !pushButton.disabled;
				    })
				  
			  }
		  });
	  });
}
function subscribe(){
	pushButton.disabled = true;
	messaging.requestPermission()
	.then(function() {
	  console.log('Notification permission granted.');
	// TODO(developer): Retrieve an Instance ID token for use with FCM.
	  getToken();
	  unsubscribeButton.disabled = !pushButton.disabled;
	})
	.catch(function(e) {
	  console.log('Unable to get permission to notify.', e);
	  if(Notification.permission === 'denied') {
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
          console.warn('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
	});
}


function _subscribe() {
  // Disable the button so it can't be changed while  
  // we process the permission request  
 

  
    pushButton.disabled = true;
     navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {
        // The subscription was successful  
    	  unsubscribeButton.disabled = !pushButton.disabled;
        console.log("Subscription ",subscription)
        // TODO: Send the subscription.endpoint to your server  
        // and save it to send a push message at a later date
        // return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if(Notification.permission === 'denied') {
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
          console.warn('Permission for Notifications was denied');
          pushButton.disabled = true;
        } else {
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);
          pushButton.disabled = false;
          pushButton.textContent = 'Enable Push Messages';
        }
      });
  });
  
     messaging.onMessage(function(payload) {
    	    console.log("Message received. ", payload);
    	    // [START_EXCLUDE]
    	    // Update the UI to include the received message.
    	    appendMessage(payload);
    	    // [END_EXCLUDE]
    	  });
     
 
     
     function appendMessage(payload) {
    	    const messagesElement = document.querySelector('#messages');
    	    const dataHeaderELement = document.createElement('h5');
    	    const dataElement = document.createElement('pre');
    	    dataElement.style = 'overflow-x:hidden;'
    	    dataHeaderELement.textContent = 'Received message:';
    	    dataElement.textContent = JSON.stringify(payload, null, 2);
    	    messagesElement.appendChild(dataHeaderELement);
    	    messagesElement.appendChild(dataElement);
    	  }
}