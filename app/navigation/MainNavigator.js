/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import HeaderIconButton from '../components/navigation/HeaderIconButton';



// import Welcome screen
import Camera from '../screens/camera/Camera';

// import SignUp screen
import SignUp from '../screens/signup/SignUp';

// import SignIn screen
import SignIn from '../screens/signin/SignIn';

// import ForgotPassword screen
import ForgotPassword from '../screens/forgotpassword/ForgotPassword';

// import TermsConditions screen
import TermsConditions from '../screens/terms/TermsConditions';

// import HomeNavigator
import HomeNavigator from './HomeNavigator2';
import DrawerNavigator from './DrawerNavigator';
// import Product screen
import Product from '../screens/product/Product';

// import Categories screen
import Categories from '../screens/categories/Categories';
import Category from '../screens/categories/Category';
import Accepted from '../screens/accepted/Accepted';
// import Search results screen
import SearchResults from '../screens/search/SearchResults';

// import Checkout screen
import Checkout from '../screens/checkout/Checkout';

// import EditProfile screen
import EditProfile from '../screens/profile/EditProfile';



// import AddAddress screen
import AddAddress from '../screens/address/AddAddress';

// import EditAddress screen
import EditAddress from '../screens/address/EditAddress';

// import Payment screen
import PaymentMethod from '../screens/payment/PaymentMethod';

// import AddCreditCard screen
import AddCreditCard from '../screens/payment/AddCreditCard';

// import Notifications screen
import Notifications from '../screens/notifications/Notifications';

// import Orders screen
import Orders from '../screens/orders/Orders';

// // import AboutUs screen
// import AboutUs from '../screens/about/AboutUs';
import TopBar from '../navigation/TopBar'
import Scanner from '../screens/Town/Scanner'
// import colors
import Colors from '../theme/colors';

// MainNavigatorA Config
const SAVE_ICON = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

// create stack navigator
const Stack = createStackNavigator();

import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Ordercomplete from '../screens/camera/Ordercomplete'
// MainNavigatorA
import { navigationRef } from './RootNavigation.js';




class MainNavigatorA extends Component {
 
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.value !== this.props.order) {
  //     this.props.openModal()
  //     console.log("1")
  //     return true;
  //   } else {
  //     console.log("1")
  //     return false;
  //   }
  // }

 

  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: false,
          headerStyle: {
            elevation: 1,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.onBackground,
          headerTitleAlign: 'center',
          animationTypeForReplace: 'pop',
          
        }}>
       
       { this.props.isloggedin == false ? (
          <>
       <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Create Account',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
                </>
) : (
  <>
   <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: 'Forgot Password?',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'Terms and Conditions',
          }}
        />
         <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            title: 'Scan Qr Code',
          }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: true}}
        />
       
         <Stack.Screen
          name="Accepted"
          component={Accepted}
          options={{headerShown: false}}
        />

<Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: true,title:"Order scanner."}}
        />
        
        
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            title: 'All Categories',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            title: 'Pizza',
          }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{
            title: 'Search Results',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: 'Checkout',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation}) => ({
            title: 'Edit Profile',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            title: 'Add New Address',
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            title: 'Edit Address',
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={({navigation}) => ({
            title: 'Payment Method',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddCreditCard"
          component={AddCreditCard}
          options={{
            title: 'Add Credit Card',
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'My Orders',
          }}
        />
         <Stack.Screen
          name="Ordercomplete"
          component={Ordercomplete}
          options={{
            title: 'Take Delivery Picture',
          }}
        />
        </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
      }
}


function mapStateToProps( state ) {
  return { 
    token: state.cart.quantity,
    username:state.auth.username,
    password:state.auth.password,
    regloader:state.auth.regloader,
    isloggedin:state.auth.loggedin,
    order:state.order.order,
    internetstate:state.auth.internetstate
  };
}

export default connect(mapStateToProps, actions)(MainNavigatorA);
