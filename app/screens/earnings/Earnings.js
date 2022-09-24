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
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
	
import DateTimePicker from '@react-native-community/datetimepicker';



class Earnings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 09:12:00", color:"#228B22", completed:1},
        {id:2,  description:"Aenean massa. Cum sociis natoque penatibus et magnis.",     date:"2019-03-25 10:23:00", color:"#FF00FF", completed:0},
        {id:3,  description:"nascetur ridiculus mus. Donec quam felis, ultricies dnec.", date:"2019-03-25 11:45:00", color:"#4B0082", completed:1},
        {id:4,  description:"Donec pede justo, fringilla vel, aliquet nec, vulputdate.", date:"2019-03-25 09:27:00", color:"#20B2AA", completed:0},
        {id:5,  description:"Nullam dictum felis eu pede mollis pretium. Integer tirr.", date:"2019-03-25 08:13:00", color:"#000080", completed:0},
        {id:6,  description:"ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas st.", date:"2019-03-25 10:22:00", color:"#FF4500", completed:1},
        {id:7,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 13:33:00", color:"#FF0000", completed:0},
        {id:8,  description:"Maecenas nec odio et ante tincidunt tempus. Donec vitae .", date:"2019-03-25 11:56:00", color:"#EE82EE", completed:0},
        {id:9,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 15:00:00", color:"#6A5ACD", completed:0},
        {id:10, description:" Aenean imperdiet. Etiam ultricies nisi vel augues aasde.", date:"2019-03-25 12:27:00", color:"#DDA0DD", completed:0},
      ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert("Item selected: "+item.description)
  }

  __getCompletedIcon = (item) => {
    if(item.completed == 1) {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    } else {
      return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
    }
  }

  __getDescriptionStyle = (item) => {
    if(item.completed == 1) {
      return {textDecorationLine:"line-through", fontStyle:'italic', color:"#808080"};
    }
  }
  
   onDateSelected=(value) =>{
   let date = value.toISOString().split( "T" )[0]
   let hdate = value.toDateString()
   console.log(hdate)
   this.props.setdate(value,hdate)
  };

 showPicker = () =>{
  this.props.showdate()
 }
  
  render(){
  return (
 <View style={{flex:1,flexDirection:'column'}}>
   <View style={styles.header}>
              <View style={[styles.topButton, styles.left]}>
                <TouchableItem onPress={()=>this.props.navigation.navigate('Town')} borderless>
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
<Text style={styles.textStyle2}>0.00</Text>
<Text style={styles.textStyle}>Total Earnings</Text>
<Text style={styles.textStyle}></Text>
            </View>
            {this.props.datepicker && (
                <DateTimePicker
                  value={this.props.selectdate}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={()=>this.onDateSelected(value)}
                  style={styles.datePicker}
                />
        )}

<View style={styles.container}>
        <FlatList 
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={[styles.card, {borderColor:item.color}]} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: this.__getCompletedIcon(item)}}/>
              <View style={styles.cardContent}>
              <Text style={styles.textStyle}>ID</Text>
                <Text style={[styles.description, this.__getDescriptionStyle(item)]}>{item.description}</Text>
                <Text style={[styles.description, this.__getDescriptionStyle(item)]}>{item.description}</Text>
                <Text style={styles.textStyle}>Fare</Text>
                <Text style={styles.textStyle}>Earning</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>

     
     </View>
  );
      }
}

function mapStateToProps( state ) {
  return { 
  user:state.auth.user,
  datepicker:state.auth.datepicker,
  selectdate:state.auth.selectdate || new Date(),
  hdate:state.auth.hdate
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