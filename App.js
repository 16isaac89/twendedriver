import React, {Component, Fragment} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import MainNavigator from './app/navigation/MainNavigator';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Provider } from 'react-redux';
import store from './app/redux/store'
import {saveNotificationToken,updateLocation} from './app/redux/actions'

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
const LOCATION_TASK_NAME = 'background-location-task';

//0756686374
class App extends Component {

  trackdriver = async() =>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 6000,
  foregroundService: {
    notificationTitle: "BackgroundLocation Is On",
    notificationBody: "We are tracking your location",
    notificationColor: "#ffce52",
  },
      });
}


  registerForPushNotificationsAsync = async() => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
     
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  
  componentDidMount(){
    this.registerForPushNotificationsAsync().then(token => 
      store.dispatch(saveNotificationToken(token))
      );

      this.trackdriver()
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
    
      return;
    }
    if (data) {
    
        const { locations } = data;
        let position = locations[0].coords
       
        store.dispatch(updateLocation(position))
        //dispatch({type:GET_LOCATION,payload:position})
    
    }
  });
      
  }
  render(){
  return (
    <SafeAreaProvider>
       <Provider store={store}>
      <MainNavigator />
      </Provider>
    </SafeAreaProvider>
  );
  }
}

export default App;
