import React, {Component, Fragment} from 'react';



import Colors from '../../theme/colors';
import MapView, {Marker,PROVIDER_GOOGLE,Polyline}from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Animated,Image,PermissionsAndroid,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Modal from '../../components/modals/Modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine'
class Town extends Component {


 


  

  async componentDidMount(){
    await this.backgroundlocations()
  }


  getMapRegion = () => ({
    latitude: this.props.latitude,
    longitude: this.props.longitude,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
   });

  componentDidUpdate(prevProps){
    console.log(this.props.distanceTravelled)
    if ( this.props.active !== prevProps.active ) {
      this.props.navigation.navigate('Accepted')
  }
  }
  starttrack = () =>{
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
                console.log("position");
                console.log(position.coords.latitude);
                this.props.updateLocation(position)
                
              },
              (error) => {
                console.log(error);
              },
              { enableHighAccuracy: true, distanceFilter: 100,maximumAge: 0, fastestInterval: 2000,showsBackgroundLocationIndicator:true,interval:1000 }
            );
          } else if (result['android.permission.ACCESS_COARSE_LOCATION']
          || result['android.permission.ACCESS_FINE_LOCATION']
          || result['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'never_ask_again') {
            alert('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
          }
        });
    }
  }
  


  render() {
    return (
        <View style={styles.container}>
        
          <Modal />
        <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
               // followsUserLocation={true}
                region={this.getMapRegion()}
         initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
          }}
        >
           {/* <Marker
        ref={marker => { this.marker = marker }}
        coordinate={this.props.coordinate}
      > */}
      <Marker coordinate={this.getMapRegion()} >
       <MaterialIcons name="delivery-dining" size={40} color="green" />
        </Marker>
        </MapView>

        <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '3%', //for center align
            left:'4%',
            alignSelf: 'flex-start' //for align to right
        }}
    >
<TouchableOpacity onPress={()=> this.props.navigation.openDrawer()} style={styles.menubtn}>
<Icon
    name="menu"
    color="green"
    size={40}
  />
</TouchableOpacity> 
</View>


<View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            bottom: '23%', //for center align
            right:'6%',
            alignSelf: 'flex-start' //for align to right
        }}
    >
<TouchableOpacity onPress={()=> this.starttrack()} style={styles.menubtn}>
<MaterialIcons
    name="gps-fixed"
    color="green"
    size={40}
  />
</TouchableOpacity> 
</View>



<View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '1%', //for center align
            right:'4%',
            alignSelf: 'flex-start' //for align to right
        }}
    >
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Camera')} style={styles.menuscanner}>
<FontAwesome name="qrcode" size={60} color="green" />
</TouchableOpacity>
</View>

<View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
           bottom:'15%',
            width:Dimensions.get('window').width,
           flexDirection:"row",
           alignContent:'center',
           alignItems:'center',
           justifyContent:'center',
           borderTopLeftRadius:20,
           borderTopRightRadius:20
        }}

    >
      {/* <Text style={styles.textStyle3}>SPEED:{this.props.distanceTravelled}</Text> */}
    </View>

<View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
           height:"15%",
           bottom:0,
            width:Dimensions.get('window').width,
           backgroundColor:"#7ea459",
           flexDirection:"row",
           alignContent:'center',
           alignItems:'center',
           borderTopLeftRadius:20,
           borderTopRightRadius:20
        }}
    >
      <View style={{
        flexDirection:"column",
        flex: 1,
        }}>
<Text style={styles.textStyle2}>Completed Trips</Text>
<Text style={styles.textStyle3}>0</Text>
      </View>

     

      <View style={{
        flexDirection:"column",
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flex: 1,
        }}>
<Text style={styles.textStyle2}>Today's Earnings</Text>
<Text style={styles.textStyle3}>UGX: {this.props.earning}</Text>
      </View>
 
</View>
      </View>
     
    );
  }
}

function mapStateToProps( state ) {
  return { 
   latitude:state.auth.latitude,
   longitude:state.auth.longitude,
   speed:state.auth.speed,
   active:state.order.active,
   earning:state.order.earning,
   coordinate:state.auth.coordinate,
   active:state.order.active,
   routeCoordinates: state.auth.routeCoordinates,
  distanceTravelled: state.auth.distanceTravelled,
  prevLatLng:state.auth.valueprevLatLng
  };
}

export default connect(mapStateToProps, actions)(Town);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      ...StyleSheet.absoluteFillObject
    },
    textStyle2: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 15,
      paddingHorizontal: 5,
      textAlign: 'center'
    },
    textStyle3: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
      paddingHorizontal: 5,
      textAlign: 'center'
    },
    menubtn:{
      backgroundColor:'white',
      borderRadius:30,
    },
    menuscanner:{
      backgroundColor:'white',
      borderRadius:30,
    }
  });
  
