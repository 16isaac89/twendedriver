/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import haversine from 'haversine';
import Geolocation from 'react-native-geolocation-service';
import getDistance from 'geolib/es/getPreciseDistance';
import { apikey } from '../../utils/utilities';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 0.3476;
const LONGITUDE = 32.5825;
var initFlag = false;

let interval;
let interval2;
class Watch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      startLatitude: LATITUDE,
      startLongitude: LONGITUDE,
      prevLatitude: 0,
      prevLongitude: 0,
      time: 0,
      routeCoordinates: [],
      distanceTravelled: 0.00,
    };
  }

  //    componentWillUnmount() {
  //      navigator.geolocation.clearWatch(this.watchID);
  //    }

   getDistanceMatrix=async(position1,position2)=>
    {
      console.log("position1")
      console.log(position1)
      console.log(position2)
       const Location1Str = position1.latitude + "," +position1.longitude;
       const Location2Str = position2.latitude + "," +position2.longitude;

       let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

       let params = `origins=${Location1Str}&destinations=${Location2Str}&mode=driving&key=${apikey}`; // you need to get a key
       let finalApiURL = `${ApiURL}${encodeURI(params)}`;
console.log(finalApiURL)
       let fetchResult =  await fetch(finalApiURL); // call API
       let Result =  await fetchResult.json(); // extract json
       console.log("Result.rows[0].elements[0].distancefgfggdfggfdfg")
       console.log(parseFloat(Result.rows[0].elements[0].distance.value/1000))
       return parseFloat(Result.rows[0].elements[0].distance.value/1000);

    }
  getMapRegion = () => ({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });



  success = (position) =>{
  
    let position1 = {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude,
    }
     let position2 = {
       latitude: this.state.prevLatitude,
       longitude: this.state.prevLongitude,
     }

     if (!initFlag) {
       this.setState({
         prevLatitude: position.coords.latitude,
         prevLongitude: position.coords.longitude,
         speed:position.coords.speed
       });

       initFlag = true;
     }

     const {
       routeCoordinates,
       distanceTravelled,
       prevLatitude,
       prevLongitude,
       time,
     } = this.state;

     this.setState({
       started: true,
       prevLatitude: position.coords.latitude,
       prevLongitude: position.coords.longitude,
       routeCoordinates: routeCoordinates.concat([
         {
           prevLatitude,
           prevLongitude,
         },
       ]),
       distanceTravelled:
         distanceTravelled +
         haversine(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
         },
         {
          latitude: this.state.prevLatitude,
          longitude: this.state.prevLongitude,
        }
         ),
       
     });

     // this.props.updateLocation(position);
   
}


starttrack = async(order) => {
  interval = setInterval(() => {
    this.setState({
      time: this.state.time + 1,
    });
  }, 1000);
  //await AsyncStorage.setItem('activeorder', JSON.stringify(order))
//await AsyncStorage.setItem('active',JSON.stringify(id))
//  interval2 = setInterval(async()=> {
  // await Geolocation.getCurrentPosition((position)=>
  await Geolocation.watchPosition((position)=>
       this.success(position),
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,distanceFilter:1
          },
        );
//  }, 9000);
}

componentWillUnmount(){
  clearInterval(interval);
    clearInterval(interval2);
}
  

  onPressDrop = () => {
    this.setState({
      started: false,
    });
    clearInterval(interval);
    clearInterval(interval2);
    console.log(this.state.distanceTravelled)
  };

  convertSecondToString = seconds => {
    return (seconds - (seconds % 60)) / 60 + ' min ' + (seconds % 60) + ' sec ';
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
          {/* <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          /> */}
        </MapView>
        <View
          style={{
            width: '100%',
            padding: 40,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#0044FF',
            }}></View>
        </View>
        <View style={{width: '100%', padding: 20, backgroundColor: '#555555'}}>
          <View style={styles.buttonContainer}>
            <Text style={styles.bottomBarDistance}>
              {parseFloat(this.state.distanceTravelled).toFixed(6)} km
            </Text>
            <Text style={styles.bottomBarTimer}>
              {this.convertSecondToString(this.state.time)}
            </Text>
          </View>
          {this.state.started ? (
            <TouchableOpacity style={styles.dropOff} onPress={()=>this.onPressDrop()}>
              <Text style={{color: '#FFFFFF'}}>Drop Off</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dropOff} onPress={()=>this.starttrack()}>
              <Text style={{color: '#FFFFFF'}}>Start</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bottomBarDistance: {
    color: '#FF8800',
  },
  bottomBarTimer: {
    color: '#0088FF',
    marginLeft: 30,
  },
  dropOff: {
    backgroundColor: '#FF8800',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Watch;
