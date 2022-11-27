import React, {Component, Fragment} from 'react';
import Colors from '../../theme/colors';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image, TouchableHighlightBase,ActivityIndicator } from 'react-native';
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

 class Accepted extends Component {
  calcDistance = newLatLng => {
    let prevLatLng  = this.props.prevLatLng;
    console.log(prevLatLng,newLatLng)
    return haversine(prevLatLng, newLatLng) || 0;
  };
  backgroundlocations = async() =>{
    await Geolocation.watchPosition(
       (position) => {
         const { latitude, longitude } = position.coords;
         
         // const { routeCoordinates,distanceTravelled  } = this.state;
         let newCoordinate = {
           latitude,
           longitude
         };
         let routeCoordinates = this.props.routeCoordinates
         let distanceTravelled = this.props.distanceTravelled + this.calcDistance(newCoordinate)
         let prevLatLng = newCoordinate
         console.log("prevLatLng")
         console.log(prevLatLng)
         this.props.updateposition(latitude,longitude,routeCoordinates,distanceTravelled,prevLatLng)
       
       },
       (error) => {
         console.log(error);
       },
       //{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,interval:1000 }
       { enableHighAccuracy: true, distanceFilter: 1,maximumAge: 0, fastestInterval: 2000,showsBackgroundLocationIndicator:true }
     // this.getlocation()
     )
}
componentDidMount(){
  console.log("this.props.orderstatussdsadasd")
  console.log(this.props.orderstatus)
}
  starttrack = () =>{
    navigator.geolocation.watchPosition(
      position => {
       const { latitude, longitude } = position.coords;
       const { routeCoordinates,distanceTravelled  } = this.state;
       const newCoordinate = {
        latitude,
        longitude
       };
      
    })
  }
  cancelorder = ()=>{
    let driver = this.props.user.id
    let id = this.props.active.id
    this.props.cancelOrder(id,driver)
  }
componentDidUpdate(){
  if (this.props.completedstatus === "1" ) {
    this.props.navigation.navigate('Town')
  }
}
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.orderimage !== this.props.orderimage) {
      this.props.opencompletemodal()
    }
  }
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
return this.props.loader === true ? <ActivityIndicator size="large" /> :  <TouchableOpacity onPress={()=>this.props.otpmodalo()}  style={styles.appButtonContainer1}>
    <Text style={styles.appButtonText}>Start</Text>
  </TouchableOpacity>
 }else if(status === "started"){
return this.props.loader === true ? <ActivityIndicator size="large" /> : <TouchableOpacity onPress={()=>this.props.opencompletemodal()}  style={styles.appButtonContainer1}>
    <Text style={styles.appButtonText}>Complete</Text>
  </TouchableOpacity>
}
}

  render() {
    return (
        <View style={styles.container}>
          <StartModal />
          <CompleteOrder navigation={this.props.navigation}/>
        <MapView style={styles.map}
         initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
           <MapViewDirections
    origin={this.props.active.from || {latitude: this.props.latitude, longitude: this.props.longitude}}
    destination={this.props.active.to  || {latitude: this.props.latitude, longitude: this.props.longitude}}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="green"
  />
        </MapView>

       

<View style={styles.topbar}>
     
<View style={{flex:1}}>
            <Image
          style={{width:60,height:60,borderRadius:95,marginBottom:7}}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
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
            <TouchableOpacity style={{margin:10}}><Icon name="call" color="green" size={40}/></TouchableOpacity>
            <TouchableOpacity><Oct name="direction" color="green" size={40}/></TouchableOpacity>
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
   prevLatLng:state.auth.valueprevLatLng
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
        height:"10%",
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
        width:"65%",
        margin:5
      },
      appButtonContainer2: {
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:10
      },
      appButtonText: {
        fontSize: 18,
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
  });
  
