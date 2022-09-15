import React from 'react';
import { Text, View, TouchableOpacity, Image,Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';



let camera; 
class Ordercomplete extends React.Component {
    
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderimage !== this.props.orderimage) {
      this.props.navigation.navigate('Accepted')
    }
  }

takePicture=async()=>{
    if( camera ) {
      const options = {quality: 0.5};
      const data = await camera.takePictureAsync(options);
      let uri = data.uri
      this.props.ordercompleteimage(uri)
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => (camera = ref)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white', }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.takePicture()} style={{
                 position: 'absolute',//use absolute position to show button on top of the map
                 bottom:'15%',
                  width:Dimensions.get('window').width,
                 flexDirection:"row",
                 alignContent:'center',
                 alignItems:'center',
                 justifyContent:'center',
                 borderTopLeftRadius:20,
                 borderTopRightRadius:20
              }}> 
              <Entypo name="camera" size={50} color="orange" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

function mapStateToProps( state ) {
    return { 
        orderimage:state.order.orderimage
    };
  }
  
  export default connect(mapStateToProps, actions)(Ordercomplete);