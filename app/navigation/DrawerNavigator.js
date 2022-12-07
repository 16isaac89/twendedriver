import  React,{Component} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Town from '../screens/Town/Town'
import Settings from '../screens/settings/Settings'
import Checkout from '../screens/checkout/Checkout'
import Earnings from '../screens/earnings/Earnings'
const Drawer = createDrawerNavigator();
import Icon from 'react-native-vector-icons/MaterialIcons';
import TopBar from './TopBar' 
import Wallet from './Wallet'
import DrawerComponent from '../components/navigation/DrawerComponent'
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import  Entypo from 'react-native-vector-icons/Entypo'; 
import Watch from '../screens/Town/Watch'



class DrawerNavigator extends Component {

   async componentDidMount(){
      let id = this.props.user.id;
      this.props.getOrders(id);
  }
  
   render(){
  return (
    
      <Drawer.Navigator 
      initialRouteName="Town"
      drawerContentOptions={{
         activeTintColor: '#e91e63',
         itemStyle: {marginVertical: 5},
       }}
       drawerContent={(props) => <DrawerComponent {...props} />}
	   >
       
        <Drawer.Screen 
        name="Town" 
        component={Town} 
        options={{
            title: 'Town',
            drawerIcon: ({focused, size}) => (
               <Icon
                  name="location-city"
                  size={40}
                  color={focused ? '#7cc' : '#2ac759'}
               />
            ),
         }}
        />
        <Drawer.Screen 
        name="Settings" 
        component={Settings} 
        options={{
            title: 'Settings',
            drawerIcon: ({focused, size}) => (
               <Icon
                  name="settings"
                  size={40}
                  color={focused ? '#7cc' : '#e3cb14'}
               />
            ),
         }}
        />
        <Drawer.Screen 
        name="TopBar" 
        component={TopBar} 
        
        options={{
            title: 'Trips',
            headerShown: false, gestureEnabled: false,
            drawerIcon: ({focused, size}) => (
               <MaterialIcons name="trip-origin" size={40} color={focused ? 'orange' : '#18689e'} />
              
            ),
         }}
        />
         {/* <Drawer.Screen 
        name="Wallet" 
        component={Wallet} 
        options={{
         title: 'Wallet',
            headerShown: false, gestureEnabled: false,
            drawerIcon: ({focused, size}) => (
               <Icon
                  name="bookmark"
                  size={20}
                  color={focused ? 'orange' : 'green'}
               />
            ),
         }}
        /> */}

{/* <Drawer.Screen 
        name="Checkout" 
        component={Checkout} 
        options={{
            title: 'Checkout',
            drawerIcon: ({focused, size}) => (
               <Icon
                  name="bookmark"
                  size={20}
                  color={focused ? 'orange' : 'green'}
               />
            ),
         }}
        /> */}

        
<Drawer.Screen 
        name="Earnings" 
        component={Earnings} 
        options={{
            title: 'Earnings',
            drawerIcon: ({focused, size}) => (
               <Entypo name="bar-graph" size={40} color={focused ? 'orange' : '#c4162d'} />
            ),
         }}
        />

<Drawer.Screen 
        name="Watch" 
        component={Watch} 
        options={{
            title: 'Earnings',
            drawerIcon: ({focused, size}) => (
               <Entypo name="bar-graph" size={40} color={focused ? 'orange' : '#c4162d'} />
            ),
         }}
        />

        

      </Drawer.Navigator>
    
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
     user:state.auth.user
   };
 }
 
 export default connect(mapStateToProps, actions)(DrawerNavigator);