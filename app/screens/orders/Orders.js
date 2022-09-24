/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
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



// Orders Styles


import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import order from '../../redux/reducers/order';
import Modal from '../../components/modals/Modal'

// Orders
 class Orders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: sample_data.orders,
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo =  (item) => {
    this.props.navigation.navigate('Product',{'item':item})
  };

  keyExtractor = item => item.id.toString();

  renderItem = ({item, index}) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.id}
      orderDate={item.created_at}
     orderprice = {item.money}
      orderStatus={item.status}
      orderFrom={item.from}
      orderTo={item.to}
      
      onPress={()=>this.navigateTo(item)}
    />
  );

  render() {
    const orders = this.props.orders
    return (
      <SafeAreaView style={styles.screenContainer}>
       <Modal />

        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          {
            orders.length > 0 ?
            <FlatList
            data={orders}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={styles.productsContainer}
          />
          :
          <View style={styles.item}>
              <Subtitle1>You do not have any active orders.....</Subtitle1> 
              </View>
          }
          
        </View>
      </SafeAreaView>
    );
  }
}


function mapStateToProps( state ) {
  return { 
    orders: state.order.orders,
    user:state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Orders);


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
    top: 16,
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
  },

});