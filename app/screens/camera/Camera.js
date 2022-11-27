import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class Camera extends Component {

  onSuccess = e => {
    let order = e.data
      this.props.setscanned(order)
    //console.log(e.data)
  };

  render() {
    return (
      <View>
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
