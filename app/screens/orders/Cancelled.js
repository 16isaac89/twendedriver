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
} from 'react-native';

// import components
import OrderItem from '../../components/cards/OrderItem';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

// Orders Styles
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

});

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';


// Orders
 class Cancelled extends Component {

  

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
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
      onPress={this.navigateTo('Product')}
    />
  );

  render() {
    const orders = this.props.cancelled
    return (
      <SafeAreaView style={styles.screenContainer}>
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
              <Subtitle1>You do not have any cancelled orders.....</Subtitle1> 
              </View>
          }
          
        </View>
      </SafeAreaView>
    );
  }
}


function mapStateToProps( state ) {
  return { 
    cancelled: state.order.cancelled,
    user:state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Cancelled);
