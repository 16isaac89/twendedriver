import { registerRootComponent } from 'expo';

import App from './App';
import * as Notifications from 'expo-notifications';
import store from "./app/redux/store"
import {checklogin,orderNotification,openModal,updateLocation} from "./app/redux/actions"
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
const LOCATION_TASK_NAME = 'background-location-task';
const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'
import {  Text, View, Vibration, AppState } from 'react-native';

store.dispatch(checklogin());


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.addNotificationReceivedListener( async(notification) => {
    let notifications = notification.request.content.data.order
   if(notification.request.content.data.nottype === 1){
    if (AppState.currentState == 'active' && notification.origin === 'received') {
      await store.dispatch(orderNotification(notifications));
  } else {
    await store.dispatch(orderNotification(notifications));
  }
}
    
    // await store.dispatch(openModal());
    
  });
  




 
  

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    async({ data, error, executionInfo }) => {
      alert(data)
      let notifications = data.notification.request.content.data.order
   
    await store.dispatch(orderNotification(notifications));
    }
  
  )

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
