import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import store from "./app/redux/store"
import {checklogin,orderNotification,openModal,updateLocation} from "./app/redux/actions"
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import Geolocation from 'react-native-geolocation-service';
import notifee,{EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

store.dispatch(checklogin())

messaging().onMessage(async remoteMessage => {
  console.log("new message" , remoteMessage.data.body);
  let notificationbody = JSON.parse(remoteMessage.data.body)
  let notification = notificationbody.order
  await store.dispatch(orderNotification(notification));
 // await store.dispatch(openModal());
 console.log("notification index")
 console.log(typeof(notification.order))
 console.log("notification index")
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
  console.log("notification index2")
 console.log(notification.order)
 console.log("notification index2")
  //await store.dispatch(orderNotification(notification));
 // await store.dispatch(openModal());
  console.log('Message handled in the background!', remoteMessage);
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
    Geolocation.watchPosition(
      (position) => {
        console.log(position.coords);
        store.dispatch(updateLocation(position))
        
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 100,maximumAge: 0, fastestInterval: 2000,showsBackgroundLocationIndicator:true }
    // this.getlocation()
    )
  },
  {
    delay: 1000,
    onLoop: true,
    taskId: 'taskid',
    onError: (e) => console.log('Error logging:', e),
  },
);

ReactNativeForegroundService.start({
  id: 144,
  title: "Background Location on",
  message: "",
});

// Register the service
ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => App);
