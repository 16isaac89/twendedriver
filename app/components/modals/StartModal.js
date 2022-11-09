import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,Image,Button,ActivityIndicator } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Oct from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import AntDesign  from 'react-native-vector-icons/AntDesign';

import moment from 'moment-timezone'
// SignIn Config
const PLACEHOLDER_TEXT_COLOR = Colors.secondaryColor;
const INPUT_TEXT_COLOR = "black";
const INPUT_BORDER_COLOR = Colors.secondaryColor;
const INPUT_FOCUSED_BORDER_COLOR = Colors.secondaryColor;



class StartModal extends Component {
  address = async() =>{
    

      //let address = Location.reverseGeoCodeAsync({lat, lng});
      return location
  }

  sendOTP = async() =>{
    let id = this.props.active.id
    let otp = this.props.otp
    this.props.sendOtp(id,otp)
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      inputModalVisible: false,
    };
  }
  
  emailFocus = () => {
    this.setState({
      emailFocused: true,
     
    });
  };

  

  emailChange = text => {
    this.props.otpchanged(text)
  };

  showButton = () =>{
    if(this.props.loader == true){
     return <ActivityIndicator size="large" />
    }else{
     return <Button
      color={'orange'}
      rounded
      borderRadius
      onPress={()=>this.sendOTP()}
      title={'Send OTP'.toUpperCase()}
      titleColor={Colors.primaryColor}
    />
    }
  }
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    
    return (
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.startmodal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>this.props.otpmodalc()}  style={{alignSelf:'flex-end'}}>
            <AntDesign name="closecircleo" size={34} color="red" />
  </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textStyle}>Get OTP from Client.</Text>
            </TouchableOpacity>

          

           
            <View style={styles.form}>
            <UnderlineTextInput
                onRef={r => {
                  this.email = r;
                }}
                onChangeText={this.emailChange}
                onFocus={this.emailFocus}
                
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="OTP"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
                value={this.props.otp}
              />

              <View style={styles.buttonContainer}>

              {this.showButton()}

              </View>

             

             
            </View>
              
    

       



            </View>
          </View>
        </Modal>
      
    );
  }
}

function mapStateToProps( state ) {
  return { 
    startmodal:state.order.startmodal,
    otp:state.order.otp,
    loader:state.order.loader,
    active:state.order.active
  };
}

export default connect(mapStateToProps, actions)(StartModal);

const styles = StyleSheet.create({
  centeredView: {
    height:400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    top:"25%"
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
 
  
  textStyle2: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
 
  form: {
  
   marginBottom:"50%"
  },
  buttonContainer: {paddingTop: 23},
});
