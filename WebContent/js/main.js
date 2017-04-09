var userToken = "";
var showNotification = false;
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
			      userToken = refreshedToken;
			      if (userToken && window.localStorage.getItem('subscribe') === '1'){
			    	
			    	  document.getElementById("onoffswitchNotification").checked = true; 
			    	  showNotification = true;
			    	  demoNotification.disabled = false;
			    	
				  }else {
					  window.localStorage.setItem('subscribe',0);
					  document.getElementById("onoffswitchNotification").checked = false;
					  showNotification = false;
					  demoNotification.disabled = true;
				  }
			     
			    })
			    .catch(function(err) {
			      console.log('Unable to retrieve refreshed token## ', err);
			      document.getElementById("onoffswitchNotification").checked = false;
			      window.localStorage.setItem('subscribe',0);
			      showNotification = false;
			      demoNotification.disabled = true;
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


var demoNotification = document.querySelector('.js-push-button-demo');

demoNotification.addEventListener('click', demoNotify);
demoNotification.disabled = true;

/*function unsubscribe() {
	window.localStorage.setItem('subscribe', 0);
	document.getElementById("onoffswitchNotification").checked = false;
}*/
function demoNotify() {
	window.open('https://sandeephoodaiot.appspot.com/pushnotification?to='+userToken, '_blank');
	
}
function subscribe(){
	
	messaging.requestPermission()
	.then(function() {
	  console.log('Notification permission granted.');
	  window.localStorage.setItem('subscribe', 1);
	  getToken();
	 
	})
	.catch(function(e) {
	  console.log('Unable to get permission to notify.', e);
	  if(Notification.permission === 'denied') {
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
		  alert("You have denied permission in past. To Subscribe again enable notification for this site from settings tab of your browser.");
		  window.localStorage.setItem('subscribe', 0);
		  document.getElementById("onoffswitchNotification").checked = false; 
		  demoNotification.disabled = true;
          console.warn('Permission for Notifications was denied');
         
        } else {
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);
          window.localStorage.setItem('subscribe', 0);
          document.getElementById("onoffswitchNotification").checked = false; 
          demoNotification.disabled = true;
     
        }
	});
}


function _subscribe() {
  // Disable the button so it can't be changed while  
  // we process the permission request  
 


     navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {
        // The subscription was successful  
    	 
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
        
        } else {
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);
         
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