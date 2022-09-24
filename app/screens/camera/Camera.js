import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Modal from '../../components/modals/Modal'
import UpCountryOrderStatus from '../../components/modals/UpCountryOrderStatus'
class Camera extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({
        hasCameraPermission: status === 'granted',
      });
  };

handleBarCodeScanned = async({ type, data }) => {
 
      let order = data
      this.props.setscanned(order)
 
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal />
        <UpCountryOrderStatus navigation={this.props.navigation}/>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: '#fff' }}>
            Camera permission is not granted
          </Text>
        ) : (
          <View
            style={{
              backgroundColor: 'green',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              alignItems: "center",
              justifyContent: "center"
            }}>

<BarCodeScanner
        onBarCodeScanned={({ type, data })=> this.handleBarCodeScanned({ type, data })}
        style={{
          height: '80%',
          width: '80%',

        }}
      />
            
          </View>
        )}

        {this._maybeRenderUrl()}

       
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
}



function mapStateToProps( state ) {
  return { 
   user:state.auth.user,
  };
}

export default connect(mapStateToProps, actions)(Camera);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
