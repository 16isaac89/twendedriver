import App from './App';
import {AppRegistry,PermissionsAndroid,Platform} from 'react-native';

import {name as appName} from './app.json';
import store from "./app/redux/store"
import {checklogin,orderNotification,openModal,updateLocation} from "./app/redux/actions"
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import notifee,{EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';


store.dispatch(checklogin())

messaging().onMessage(async remoteMessage => {
  console.log("new message" , remoteMessage.data.body);
  let notificationbody = JSON.parse(remoteMessage.data.body)
  let notification = notificationbody.order
  await store.dispatch(orderNotification(notification));

  notifee.displayNotification({
    title: 'Your order has been shipped',
    body: `Your order was shipped`,
    android: {
      channelId: 'orders',
    },
  });
})

messaging().setBackgroundMessageHandler(async remoteMessage => {
  let notificationbody = JSON.parse(remoteMessage.data.body)
  let notification = notificationbody.order
  await store.dispatch(orderNotification(notification));
});


notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
console.log(notification)
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});


notifee.onForegroundEvent(({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      break;
  }
});

ReactNativeForegroundService.add_task(
  () => {
    
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(
        [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
        ]
        ).then((result) => {
          if (result['android.permission.ACCESS_COARSE_LOCATION']
          && result['android.permission.ACCESS_BACKGROUND_LOCATION']
          && result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
            console.log('sdfsdfsdf')
    Geolocation.getCurrentPosition(
      (position) => {
        
        //Will give you the location on location change
        console.log(position);
        store.dispatch(updateLocation(position))
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        console.log(currentLongitude);
        
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 100, fastestInterval: 2000 }
    );   
          } else if (result['android.permission.ACCESS_COARSE_LOCATION']
          || result['android.permission.ACCESS_FINE_LOCATION']
          || result['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'never_ask_again') {
            alert('Please Go into Settings -> Applications -> Twende Delivery -> Permissions and Allow permissions to continue');
          }
        });
    }
  },
  {
    delay: 90000,
    onLoop: true,
    taskId: '2300',
    onError: (e) => console.log('Error logging:', e),
  },
);

ReactNativeForegroundService.start({
  id: 2300,
  title: "Background mode activated",
  message: "Twende is currently running in background mode.",
});

// Register the service
ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => App);