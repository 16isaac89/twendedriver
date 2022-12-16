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
  Image
} from 'react-native';

// import components
import OrderItem from '../../components/cards/OrderItem';
import {Caption, Subtitle1, Subtitle2,SmallText,Heading5} from '../../components/text/CustomText';
// import colors
import Colors from '../../theme/colors';

// import components
import Button from '../../components/buttons/Button';

import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';

//import sample data
import sample_data from '../../config/sample-data';

const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
// const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
	
import DateTimePicker from '@react-native-community/datetimepicker';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';


class Earnings extends Component {
  async componentDidMount(){
    let  today 		= new Date();
	let  dd 		= String(today.getDate()).padStart(2, '0');
	let  mm 		= String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
	let  yyyy 		= today.getFullYear();
	let date =  `${yyyy}-${mm}-${dd}`;
  let driver = this.props.user.id
  let selectedDate = today;
  let hdate = selectedDate.toDateString()
  this.props.setdate(selectedDate,hdate,date,driver)
  //this.props.getearnings(driver,date)
  }

  __getCompletedIcon = (item) => {
    if(item.completed == 1) {
      return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
  
    } else {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    }
  }

  __getDescriptionStyle = (item) => {
    if(item.completed == 1) {
      return {textDecorationLine:"line-through", fontStyle:'italic', color:"#808080"};
    }
  }
  
   onDateSelected=(event, selectedDate) =>{
   let date = selectedDate.toISOString().split( "T" )[0]
   let hdate = selectedDate.toDateString()
   let driver = this.props.user.id
  console.log(selectedDate,hdate,date,driver)
   this.props.setdate(selectedDate,hdate,date,driver)
  };

 showPicker = () =>{
  this.props.showdate()
 }
 navigateTo =  (item) => {
  this.props.navigation.navigate('Product',{'item':item})
};
  
  render(){
  return (
 <View style={{flex:1,flexDirection:'column'}}>

<ActivityIndicatorModal
              statusBarColor={Colors.primaryColor }
              message="Getting today's earnings . . ."
              onRequestClose={this.closeModal}
              title="Please wait"
              visible={this.props.regloader}
            />


   <View style={styles.header}>
              <View style={[styles.topButton, styles.left]}>
                <TouchableItem  borderless onPress={()=>this.props.navigation.navigate('Town')}>
                  <View style={styles.buttonIconContainer}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                  </View>
                </TouchableItem>
              </View>
              <View style={[styles.topButton, styles.right]}>
                <TouchableItem onPress={()=>this.showPicker()} borderless>
                  <View style={styles.buttonIconContainer}>
                  <Ionicons name="calendar" size={24} color="black" />
                  </View>
                </TouchableItem>
              </View>

            </View>
            <View style={styles.earningssum}>
              <Text style={styles.textStyle}>Today</Text>
              <Text style={styles.textStyle}>{this.props.hdate}</Text>
<Text style={styles.textStyle2}>{this.props.total}</Text>
<Text style={styles.textStyle}>Total Earnings</Text>
<Text style={styles.textStyle}></Text>
            </View>
            {this.props.datepicker && (
                <DateTimePicker
                  value={this.props.selectdate}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={(event, selectedDate)=>this.onDateSelected(event, selectedDate)}
                  style={styles.datePicker}
                />
        )}

<View style={styles.container}>
{
  this.props.dateorders.length <= 0 ?
  <View style={{alignContent:'center',alignItems:'center'}}>
  <Text>No orders yet please search</Text>
  </View>
  :
  <FlatList 
  style={styles.tasks}
  columnWrapperStyle={styles.listContainer}
  data={this.props.dateorders}
  keyExtractor= {(item) => {
    return item.id;
  }}
  renderItem={({item}) => {
  return (
    <TouchableOpacity style={[styles.card, {borderColor:item.color}]}>
      <Image style={styles.image} source={{uri: this.__getCompletedIcon(item)}}/>
      <View style={styles.cardContent}>
      <Text style={styles.textStyle}>ID</Text>
        <Text style={[styles.description, this.__getDescriptionStyle(item)]}>From: {item.from}</Text>
        <Text style={[styles.description, this.__getDescriptionStyle(item)]}>To: {item.to}</Text>
        <Text style={[styles.description, this.__getDescriptionStyle(item)]}>Fare: {item.money}</Text>
        <Text style={[styles.description, this.__getDescriptionStyle(item)]}>Earning: {item.money*this.props.driverpercent}</Text>
       
        <Text style={styles.date}>{item.updated_at}</Text>
      </View>
    </TouchableOpacity>
  )}}/>
}
       


      </View>

     
     </View>
  );
      }
}

function mapStateToProps( state ) {
  return { 
  user:state.auth.user,
  datepicker:state.auth.datepicker,
  selectdate:state.auth.selectdate,
  hdate:state.auth.hdate,
  dateorders:state.auth.dateorders,
  user:state.auth.user,
  driverpercent:state.auth.driverpercent,
  total:state.auth.dateorders.reduce((accumulator, object) => {
    return accumulator + object.money*state.auth.driverpercent
  }, 0),
  regloader:state.auth.regloader
  };
}

export default connect(mapStateToProps, actions)(Earnings);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop:"6%",
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
    height: 80,
    backgroundColor:'#7ea459'
  },
  topButton: {
    position: 'absolute',
    top: 30,
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
    marginBottom:5
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    
   
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  earningssum:{
    flexDirection:'column',
    alignContent:'center',
    alignContent:'center',
    backgroundColor:'#7ea459',
  },



  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  tasks:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  image:{
    width:25,
    height:25,
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:6,
  },

  description:{
    fontSize:18,
    flex:1,
    color:"#008080",
    fontWeight:'bold',
  },
  date:{
    fontSize:14,
    flex:1,
    color:"#696969",
    marginTop:5
  },

});