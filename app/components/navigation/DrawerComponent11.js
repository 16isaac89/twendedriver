import React,{Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';


class DrawerComponent extends Component {
   
render(){
    const proileImage = 'react_logo.png';
let profile = this.props.user.profile !== null ? this.props.user.profile.profile :'https://raw.githubusercontent.com/AboutReact/sampleresource/master/'+proileImage;
  
    return(
        <SafeAreaView style={{flex: 1,margin:10}}>
        {/*Top Large Image */}
        <Image
          source={{uri:  profile}}
          style={styles.sideMenuProfileIcon}
        />
        <Text>
            {
                this.props.isloggedin == true ? this.props.user.fullname : ""
            }
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
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          Twende Driver v0.0.1
        </Text>
      </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      resizeMode: 'center',
      width: 100,
      height: 100,
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
  });

  function mapStateToProps( state ) {
    return { 
      token: state.cart.quantity,
      username:state.auth.username,
      password:state.auth.password,
      regloader:state.auth.regloader,
      isloggedin:state.auth.loggedin,
      user:state.auth.user
    };
  }
  
  export default connect(mapStateToProps, actions)(DrawerComponent);