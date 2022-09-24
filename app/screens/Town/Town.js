import React, {Component, Fragment} from 'react';



import Colors from '../../theme/colors';
import MapView, {ProviderPropType, Marker, AnimatedRegion, MarkerAnimated }from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Animated,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderModal from '../../components/modals/OrderModal';
import Modal from '../../components/modals/Modal';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import { MaterialIcons } from '@expo/vector-icons'; 

class Town extends Component {
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    const duration = 500
  
    if (this.props.coordinate !== nextProps.coordinate) {
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(
            nextProps.coordinate,
            duration
          );
        }
      } else {
        this.state.coordinate.timing({
          ...nextProps.coordinate,
          useNativeDriver: true, // defaults to false if not passed explicitly
          duration
        }).start();
      }
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <OrderModal navigation={ this.props.navigation }/>
          <Modal />
        <MapView style={styles.map}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        }}
         initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
          }}
        >
           <Marker
        ref={marker => { this.marker = marker }}
        coordinate={this.props.coordinate}
      >
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
    backgroundColor="#3b5998"
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
<FontAwesome name="qrcode" size={60} color="black" />
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
      <Text style={styles.textStyle3}>SPEED:{this.props.speed}</Text>
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
   coordinate:state.auth.coordinate
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
  
