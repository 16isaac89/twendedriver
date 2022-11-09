import React, {Component, Fragment} from 'react';

import {PermissionsAndroid,Platform } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import MainNavigator from './app/navigation/MainNavigator';

import { Provider } from 'react-redux';
import store from './app/redux/store'
import {saveNotificationToken,updateLocation,checklogin,orderNotification} from './app/redux/actions'
import NetworkProvider from './app/config/Network';
import Nonetwork from './app/components/modals/Nonetwork'
import OrderModal from './app/components/modals/OrderModal';
import Geolocation from 'react-native-geolocation-service';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

let watchId = ''

class App extends Component {

   getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log(fcmToken);
        console.log("Your Firebase Token is:", fcmToken);
    } else {
        console.log("Failed", "No Token Recived");
    }
  };

  // then use it
  backgroundlocation = () =>{
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
              } else if (result['android.permission.ACCESS_COARSE_LOCATION']
              || result['android.permission.ACCESS_FINE_LOCATION']
              || result['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'never_ask_again') {
                alert('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
              }
            });
        }


        
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'taskid',
        onError: (e) => console.log('Error logging:', e),
      },
    );
  }
  
  

  gettoken = async() =>{
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      this.getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  
  }

  getlocation = async() => {

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
            this.trackdriver()
          } else if (result['android.permission.ACCESS_COARSE_LOCATION']
          || result['android.permission.ACCESS_FINE_LOCATION']
          || result['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'never_ask_again') {
            alert('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
          }
        });
    }
}

  trackdriver = async() =>{
    watchId = Geolocation.watchPosition(
      (position) => {
        console.log("position");
        console.log(position.coords.latitude);
        store.dispatch(updateLocation(position))
        
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 100,maximumAge: 0, fastestInterval: 2000,showsBackgroundLocationIndicator:true }
    );
  
}


  

  
  async componentDidMount(){
   this.gettoken()
   this.getlocation()  
   this.backgroundlocation() 
  }

  
  render(){
  return (
    <SafeAreaProvider>
       <Provider store={store}>
        <NetworkProvider>
      <MainNavigator />
      <Nonetwork />
      <OrderModal navigation={ this.props.navigation } />
     
      </NetworkProvider>
      </Provider>
    </SafeAreaProvider>
  );
  }
}

export default App;
