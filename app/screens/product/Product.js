/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';
import { Ionicons } from 'react-native-vector-icons'; 
// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

// Product Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
// const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';
import styles from './styles'
import Divider from '../../components/divider/Divider';
import { MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5 } from 'react-native-vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import CompleteOrder from '../../components/modals/CompleteOrder.js';
// Product
class Product extends Component {
  completetownorder = () =>{
    let item = this.props.route.params.item 
    this.props.setActiveTown(item)
   // this.props.opencompletemodal()
  }
  componentDidMount(){
    console.log("this.props.route.params.item")
    console.log(this.props.route.params.item)
  }
//   opendest = () =>{
//     let dest = this.props.route.params.item.to
//     var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination="+dest;
// Linking.canOpenURL(url).then(supported => {
//     if (!supported) {
//         console.log('Can\'t handle url: ' + url);
//     } else {
//         return Linking.openURL(url);
//     }
// }).catch(err => console.error('An error occurred', err)); 
//   }

//   openorigin = () =>{
//     let origin = this.props.route.params.item.from
//     var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination="+origin;
// Linking.canOpenURL(url).then(supported => {
//     if (!supported) {
//         console.log('Can\'t handle url: ' + url);
//     } else {
//         return Linking.openURL(url);
//     }
// }).catch(err => console.error('An error occurred', err)); 
//   }
 
  completeorder = () =>{
    if(this.props.route.params.item.status === 'completed'){
          return  <Button
          title={`Complete`}
          titleColor={Colors.onPrimaryColor}
          height={44}
          color={Colors.primaryColor}

          rounded
          />
    }else if(this.props.route.params.item.status === "cancelled"){
      return  <Button
      title={`Cancelled`}
      titleColor={Colors.onPrimaryColor}
      height={44}
      color={"red"}
      
      rounded
      />
    }else{
     
        if(this.props.route.params.item.order_where === "upcountry"){
         return (
        
          
         <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Camera')}
          style={styles.button}
          // title={`Scan`}
          // titleColor={Colors.onPrimaryColor}
          // height={44}
          // color={"orange"}
          // rounded
          >
            <MaterialCommunityIcons name="qrcode" size={50} color="black" />
            <Text style={styles.buttonTitle}>Scan</Text>
            </TouchableOpacity>
       
         )
        }else{
          return this.props.sendingorder === true ? <ActivityIndicator size="large" color="#00ff00" /> :<Button
          onPress={()=>this.completetownorder()}
          title={`Complete Order`}
          titleColor={Colors.onPrimaryColor}
          height={44}
          color={"orange"}
          rounded
          />
        }
     
      
    }
  }
 callrecipient = () =>{
  let phone = this.props.route.params.item.recipientnumber
  Linking.openURL(`tel:${phone}`);
 }
  constructor(props) {
    super(props);
    this.state = {
      product: sample_data.product_details,
      extras: sample_data.product_variant,
      favorite: false,
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;

    navigation.navigate(screen);
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onPressAddToFavorites = () => {
    const {favorite} = this.state;
    this.setState({
      favorite: !favorite,
    });
  };

  setExtraDish = (item) => () => {
    const {product, extras} = this.state;
    const index = extras.indexOf(item);
    const picked = extras[index].picked;

    if (picked) {
      product.singleProductPrice -= item.price;
      product.total -= product.quantity * item.price;
    } else {
      product.singleProductPrice += item.price;
      product.total += product.quantity * item.price;
    }

    extras[index].picked = !picked;

    this.setState({
      product,
      extras: [...extras],
    });
  };

  onPressIncreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = product;

    quantity += 1;
    product.quantity = quantity;

    const total = quantity * product.singleProductPrice;
    product.total = total;

    this.setState({
      product,
    });
  };

  onPressDecreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = product;

    quantity -= 1;
    quantity = quantity < 1 ? 1 : quantity;
    product.quantity = quantity;

    const total = quantity * product.singleProductPrice;
    product.total = total;

    this.setState({
      product,
    });
  };

  render() {
    const {product, favorite, extras} = this.state;
    const {price, description, quantity, total} = product;
let order = this.props.route.params.item
    return (
      <Fragment>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="light-content"
        />
       <CompleteOrder navigation={this.props.navigation}/>
        <SafeAreaView style={styles.topArea} />
        <View style={styles.screenContainer}>
          <ScrollView>
            <View style={styles.header}>
              <View style={[styles.topButton, styles.left]}>
                <TouchableItem onPress={this.goBack} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View
                style={[
                  styles.topButton,
                  styles.right,
                  favorite && styles.favorite,
                ]}>
                <Text style={styles.textStyle3}>Trip: #{order.id}</Text>
              </View>
            </View>

            <View style={styles.from}>
            <MaterialIcons name="location-history" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Pickup Location</Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.textStyle3}>{order.from}</Text>
                      <TouchableOpacity onPress={()=>this.openorigin()}>
                      <Entypo name="direction" size={40} color="blue" />
                      </TouchableOpacity>
                      </View>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>


              <View style={styles.from}>
              <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Drop off Location</Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.textStyle3}>{order.to}</Text>
                      <TouchableOpacity onPress={()=>this.opendest()}>
                      <FontAwesome5 name="directions" size={40} color="orange" />
                      </TouchableOpacity>
                      </View>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>


              <View style={styles.from}>
              <MaterialIcons name="date-range" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Requested Date | Time</Text>
                      <Text style={styles.textStyle3}>{order.created_at}</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>

              <View style={styles.from}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                    <View style={styles.distance}>

                    <View style={styles.distance1}>
                      <Text style={styles.textStyle}>Distance</Text>
                      <Text style={styles.textStyle3}>{order.distance}KM</Text>
                      </View>

                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>    
              </View>


              <View style={styles.from}>
              <MaterialCommunityIcons name="cash-100" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Fare</Text>
                      <Text style={styles.textStyle3}>{order.money}</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>

              <View style={styles.from}>
              <Entypo name="phone" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Recipient Number</Text>
                      <TouchableOpacity onPress={()=>this.callrecipient()}>
                      <Text style={styles.textStyle3}>
                        {order.recipientnumber}
                        <Entypo name="phone" size={54} color="black" />
                      </Text>
                      </TouchableOpacity>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>
           
          </ScrollView>

          <View style={styles.bottomButtonsContainer}>
           {this.completeorder()}
          </View>
        </View>
        <SafeAreaView style={styles.bottomArea} />
      </Fragment>
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
  };
}

export default connect(mapStateToProps, actions)(Product);