import React, {Component, Fragment} from 'react';
import Colors from '../../theme/colors';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image, TouchableHighlightBase,ActivityIndicator,Linking,Platform,PermissionsAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Oct from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import StartModal from '../../components/modals/StartModal';
import CompleteOrder from '../../components/modals/CompleteOrder';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDSGXiLg9kRk_93B-s_2VFkrnqHfULeZtI';
import MapViewDirections from 'react-native-maps-directions';
import haversine from 'haversine'
import Geolocation from 'react-native-geolocation-service';
import getDistance from 'geolib/es/getPreciseDistance';
// const LATITUDE = 29.95539;
import AsyncStorage from '@react-native-async-storage/async-storage';
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 0.3476;
const LONGITUDE = 32.5825;
var initFlag = false;

let interval;
let watchid;
 class Accepted extends Component {
  
  async componentDidUpdate(prevProps){
    if ( this.props.otpstatus !== prevProps.otpstatus) {
      await this.starttrack()
    }
    }
  pickupdirections = (order) =>{
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.from}`;
Linking.canOpenURL(url).then(supported => {
    if (!supported) {
        console.log('Can\'t handle url: ' + url);
    } else {
        return Linking.openURL(url);
    }
}).catch(err => console.error('An error occurred', err)); 
  }
  dropoffdirections = (order) =>{
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.to}`;
Linking.canOpenURL(url).then(supported => {
    if (!supported) {
        console.log('Can\'t handle url: ' + url);
    } else {
        return Linking.openURL(url);
    }
}).catch(err => console.error('An error occurred', err)); 
  }
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      startLatitude: LATITUDE,
      startLongitude: LONGITUDE,
      prevLatitude: 0,
      prevLongitude: 0,
      time: 0,
      speed:0,
      routeCoordinates: [],
      distanceTravelled: 0,
    };
  }

  onPressDrop = () => {
    this.setState({
      started: false,
    });
    clearInterval(interval);
  };

  getMapRegion = () => ({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });



  success = (position) =>{
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
  await AsyncStorage.setItem('activeorder', JSON.stringify(order))
  interval = setInterval(() => {
    this.setState({
      time: this.state.time + 1,
    });
  }, 1000);
  //await AsyncStorage.setItem('activeorder', JSON.stringify(order))
//await AsyncStorage.setItem('active',JSON.stringify(id))
//  interval2 = setInterval(async()=> {
  // await Geolocation.getCurrentPosition((position)=>
  watchid = await Geolocation.watchPosition((position)=>
       this.success(position),
          error => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        );
//  }, 9000);
}


  cancelorder = ()=>{
    let driver = this.props.user.id
    let id = this.props.active.id
    this.props.cancelOrder(id,driver)
  }
// componentDidUpdate(){
//   if (this.props.completedstatus === "1" ) {
//     this.props.navigation.navigate('Town')
//   }
// }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.orderimage !== this.props.orderimage) {
  //     this.props.opencompletemodal()
  //   }
  // }
  // componentWillUnmount(){
  //   this.props.clearstate()
  // }
  arrive = () =>{
    let id = this.props.active.id
    let message = "arrived"
    this.props.sendStatus(id,message)
  }
  complete = () =>{
    let id = this.props.active.id
    let message = "completed"
    this.props.sendStatus(id,message)
  }

btnCancel = () =>{
  let status = this.props.orderstatus
  if(status === "started" || status === "completed"){
return
  }else{
    return  this.props.loader === true ? <ActivityIndicator size="large" /> : 
    <View style={{flexDirection:'row',}}>
    <TouchableOpacity onPress={()=>this.cancelorder()}  style={styles.appButtonContainer2}>
<Text style={styles.appButtonText}>Cancel</Text>
</TouchableOpacity>
</View>
  }
}
btnSign = () =>{
  let status = this.props.orderstatus
 if(status === "assigned"){
return this.props.loader === true ? <ActivityIndicator size="large" /> :  <TouchableOpacity onPress={()=>this.arrive()}  style={styles.appButtonContainer1}>
    <Text style={styles.appButtonText}>Arrive</Text>
  </TouchableOpacity>
 }else if(status === "arrived"){
return this.props.loader === true ? <ActivityIndicator size="large" /> : 

<TouchableOpacity onPress={()=>this.props.otpmodalo()}  style={styles.appButtonContainer1}>
<Text style={styles.appButtonText}>Start</Text>
</TouchableOpacity> 



 }else if(status === "started"){
return this.props.loader === true ? <ActivityIndicator size="large" /> : 
<View style={{flexDirection:'column'}}>
<View style={{flexDirection:'row',marginLeft:10}}>
             <Text style={styles.textStyle}>
             {parseFloat(this.state.distanceTravelled).toFixed(3)} km
             </Text>
             <Text style={styles.textStyle}>
               {parseFloat(this.state.speed).toFixed(2)} km/h
             </Text>
             
             <Text style={styles.textStyle}>
               {this.convertSecondToString(this.state.time)}
             </Text>
             </View>

<View style={{flexDirection:'row'}}>
  <TouchableOpacity onPress={()=>this.props.opencompletemodal()}  style={styles.starttrip}>
    <Text style={styles.appButtonText}>Start Trip</Text>
  </TouchableOpacity>
<TouchableOpacity onPress={()=>this.props.opencompletemodal()}  style={styles.appButtonContainer1}>
    <Text style={styles.appButtonText}>Complete</Text>
  </TouchableOpacity>
  </View>
  </View>
}else if(status === '' || status === 'cancelled'){
  return this.props.loader === true ? <ActivityIndicator size="large" /> :  <TouchableOpacity onPress={()=>this.arrive()}  style={styles.appButtonContainer1}>
  <Text style={styles.appButtonText}>Arrive</Text>
</TouchableOpacity>
}
}

convertSecondToString = seconds => {
  return (seconds - (seconds % 60)) / 60 + ' min ' + (seconds % 60) + ' sec ';
};

componentWillUnmount(){
  clearInterval(interval);
 // clearWatch(watchid)
 if (this.watchId !== null) {
  Geolocation.clearWatch(watchid)
 }
}
  render() {
    return (
        <View style={styles.container}>
          <StartModal />
          <CompleteOrder navigation={this.props.navigation} orderactive={this.props.active.id} ordertype={'ondemand'}/>
        <MapView style={styles.map}
         initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
           <MapViewDirections
    origin={this.props.active.from}
    destination={this.props.active.to}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="green"
  />
        </MapView>

       

<View style={styles.topbar}>
     
<View style={{flex:1}}>
            <Image
          style={{width:60,height:60,borderRadius:95,marginBottom:7}}
          source={{uri: this.props.active.customer.profile || 'https://twende.io/site/assets/img/logos/black-logo.png'}}
        />
                </View>
<View style={{  flexDirection: 'column' }}>
<Text style={styles.appButtonText2}>{this.props.active.customer.firstname || null}</Text>
            <Text style={styles.appButtonText2}>Pickup Location</Text>
            
        <Text style={styles.textStyle2}>{this.props.active.from  || ""}</Text>
        </View>
        <View style={{  flexDirection: 'column' }}>
            
        <Text style={styles.textStyle2}>{this.props.active.to  || ""}</Text>
        </View>
        

        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${this.props.active.originnumber}`);}} style={{margin:10}}><Icon name="call" color="green" size={40}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${this.props.active.recipientnumber}`);}} style={{margin:10}}><Icon name="call" color="orange" size={40}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.pickupdirections(this.props.active)}><Oct name="direction" color="green" size={40}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.dropoffdirections(this.props.active)}><Oct name="direction" color="orange" size={40}/></TouchableOpacity>

        </View>



      
</View>

     

<View style={styles.bottombar}>
  
{this.btnSign()}
 {this.btnCancel()}


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
   loader:state.order.loader,
   orderstatus:state.order.orderstatus,
   orderimage:state.order.orderimage,
   completedstatus:state.order.completedstatus,
   user:state.auth.user,
   routeCoordinates: state.auth.routeCoordinates,
   distanceTravelled: state.auth.distanceTravelled,
   prevLatLng:state.auth.valueprevLatLng,
   otpstatus:state.order.otpstatus
  };
}

export default connect(mapStateToProps, actions)(Accepted);


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
    },
    topbar:{
        position: 'absolute',//use absolute position to show button on top of the map
        height:"25%",
        width:"90%",
        top:10,
        right:10,
        left:10,
         width:Dimensions.get('window').width,
        backgroundColor:"white",
        flexDirection:"column",
       flex:1,
       padding:20,
     
    },
    bottombar:{
        flex:1,
        position: 'absolute',//use absolute position to show button on top of the map
        height:"20%",
        bottom:1,
         width:Dimensions.get('window').width,
        flexDirection:"row",
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    appButtonContainer1: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:"45%",
        margin:5
      },
      starttrip: {
        elevation: 8,
        backgroundColor: "orange",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:"40%",
        margin:5
      },
      appButtonContainer2: {
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:20
      },
      appButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonText2: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        paddingHorizontal: 5,
        textAlign: 'center'
      },
      textStyle2: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        paddingHorizontal: 5,
        textAlign: 'center',
        marginTop:10
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
        width: '40%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
  
