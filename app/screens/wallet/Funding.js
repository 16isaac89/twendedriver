import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

// import components

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




class Funding extends Component {
  getOrders = () =>{
    let id = this.props.user.id;
      this.props.getOrders(id);
  }
  render(){
  return (
 <View style={{flex:1,flexDirection:'column'}}>
   

     
     </View>
  );
      }
}

function mapStateToProps( state ) {
  return { 
  user:state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Funding);

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
    marginBottom:5
  },

});