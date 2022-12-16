import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight ,
  TextInput,
  Image,
  Dimensions,
  BackHandler,
  ToastAndroid
} from 'react-native';


import Colors from '../../theme/colors';

// import components


const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
// const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';


class Ratings extends Component {
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton() {
   this.props.navigation.navigate('Home')
  }
sendrating = () =>{
  let driver = this.props.order.assigned_id
  let order = this.props.order.id
  let rating = this.props.rating
  let ratingcomment = this.props.ratecomment
  let navigation = this.props.navigation
  if(rating === '' || rating === null){
alert('Please add rating.')
  }else{
    this.props.sendrating(driver,order,rating,ratingcomment,navigation)
  }
  
}
 ratingCompleted = (rate) =>{
  this.props.setrating(rate)
 }
 

  render(){
  return (
 <View style={{flex:1,flexDirection:'column'}}>



   <View style={styles.balance}>
    <Text style={styles.textStyle}>
      Total Fare
    </Text>
    <Text style={styles.textStyle}>
      Distance: {this.props.order.distance}KM
    </Text>
    <Text style={styles.textStyle2}>
      {this.props.order.money} UGX 
    </Text>
   </View>

   <View style={styles.refund}>
   <Text>Rate your experience</Text>
       <Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
<View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="How was your experience"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
      onChangeText={(text)=>this.props.ratecommentchanged(text)}
      value={this.props.ratecomment}
    />
  </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.sendrating()}>
          <Text style={styles.loginText}>Save Rating</Text>
        </TouchableHighlight>
        </View>

     
     </View>
  );
      }
}

function mapStateToProps( state ) {
  return { 
  user:state.auth.user,
 ratecomment:state.order.ratingcomment,
 rating:state.order.rating
  };
}

export default connect(mapStateToProps, actions)(Ratings);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  productsContainer: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
    marginTop:'60%'

  },
  header: {
    width: '100%',
    height: 50,
  },
  topButton: {
    position: 'absolute',
    top: 5,
    borderRadius: 18,
    backgroundColor: Colors.background,
  },
  left: {left: 16},
  right: {right: 16},
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    margin:5,
  },
  balance:{
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height:'30%',
    backgroundColor: '#7ea459'
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 5,
    textAlign: 'center',
    marginTop:10
  },
  textStyle2: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 32,
    paddingHorizontal: 5,
    textAlign: 'center',
    marginTop:10
  },
  refund: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop:10,
    padding:20
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:2,
    borderBottomWidth: 1,
    width:'80%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
},
inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:'80%',
  borderRadius:30,
},
loginButton: {
  backgroundColor: "#00b5ec",
  margin:10,
},
loginText: {
  color: "black",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 30,
  paddingHorizontal: 5,
  textAlign: 'center',
 
},
textAreaContainer: {
  borderColor: "grey",
  borderWidth: 1,
  padding: 5
},
textArea: {
  height: 150,
  width:200,
  justifyContent: "flex-start"
}

});