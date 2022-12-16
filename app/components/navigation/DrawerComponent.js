import React,{Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';

class DrawerComponent extends Component {
   
render(){
     const proileImage = 'react_logo.png';
// let profile = this.props.user.profile !== null ? this.props.user.profile.profile :'https://raw.githubusercontent.com/AboutReact/sampleresource/master/'+proileImage;
  let profile = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/'+proileImage;
    return(
        <SafeAreaView style={{flex: 1,margin:10}}>
        {/*Top Large Image */}
        <Image source={require("../../assets/img/logo.png")} style={styles.sideMenuProfileIcon} />
        {/* <Image
          source={{uri:  profile}}
          style={styles.sideMenuProfileIcon}
        /> */}
        <Text>
          {/* <Text style={styles.textStyle}>
            Wallet Balance: {this.props.balance} UGX
          </Text> */}
            {/* {
                this.props.isloggedin == true ? this.props.user.fullname : ""
            } */}
        </Text>
        <DrawerContentScrollView {...this.props}>
          <DrawerItemList {...this.props} />
          {/* <DrawerItem
            label="Visit Us"
            onPress={() => Linking.openURL('https://aboutreact.com/')}
          /> */}
          {/* <View style={styles.customItem}>
            <Text
              onPress={() => {
                Linking.openURL('https://aboutreact.com/');
              }}>
              Rate Us
            </Text>
            <Image
              source={{uri: BASE_PATH + 'star_filled.png'}}
              style={styles.iconStyle}
            />
          </View> */}
        </DrawerContentScrollView>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Text style={styles.textStyle}>
          Twende Rider v0.0.1
        </Text>
        <TouchableOpacity onPress={()=> this.props.logout()} style={{backgroundColor:'white',borderRadius:30}}>
<Icon
    name="logout"
    backgroundColor="#3b5998"
    size={40}
    color={'red'}
  />
</TouchableOpacity> 
        </View>
      </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      resizeMode: 'center',
      width: '100%',
      height: 150,
      borderRadius: 100 / 2,
      alignSelf: 'center',
    },
    iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
    },
    customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 14,
      paddingHorizontal: 5,
      textAlign: 'center',
      marginTop:10
    },
  });

  function mapStateToProps( state ) {
    return { 
      // balance:state.wallet.balance
      // token: state.cart.quantity,
      user:state.auth.user,
      // password:state.auth.password,
      // regloader:state.auth.regloader,
      // isloggedin:state.auth.loggedin,
      // user:state.auth.user
    };
  }
  
  export default connect(mapStateToProps, actions)(DrawerComponent);