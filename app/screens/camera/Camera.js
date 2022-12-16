import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Colors from '../../theme/colors';
import OrderDetails from '../../components/modals/OrderDetails';

class Camera extends Component {
  componentDidMount(){
    console.log(this.props.orderdetails)
}

  onSuccess = e => {
    let order = e.data
    let id = this.props.user.id
    this.props.setscanned(order,id)
    //console.log(e.data)
  };

  render() {
    return (
      <View>
        <ActivityIndicatorModal
              statusBarColor={Colors.primaryColor }
              message="Getting order details . . ."
              onRequestClose={this.closeModal}
              title="Please wait"
              visible={this.props.sendingorder}
            />
            <OrderDetails />
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker={true}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Twende Deliveries</Text>
          </TouchableOpacity>
        }
      />
      </View>
    );
  }
}


function mapStateToProps( state ) {
  return { 
   user:state.auth.user,
   sendingorder:state.order.sendingorder,
   orderdetails:state.order.scanned,
  };
}
export default connect(mapStateToProps, actions)(Camera);

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#7ea459'
  },
  buttonText: {
    fontSize: 21,
    color: '#7ea459'
  },
  buttonTouchable: {
    padding: 16
  }
});
