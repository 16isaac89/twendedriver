import { registerRootComponent } from 'expo';

import App from './App';
import * as Notifications from 'expo-notifications';
import store from "./app/redux/store"
import {checklogin,orderNotification,openModal} from "./app/redux/actions"

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
   
    await store.dispatch(orderNotification(notifications));
    // await store.dispatch(openModal());
    
  });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
