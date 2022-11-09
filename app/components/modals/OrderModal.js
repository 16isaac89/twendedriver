import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,Image } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Oct from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';



class OrderModal extends Component {

  stopSound = async() =>{
     let sound = this.props.sound
     await sound.stop()
   // this.props.stopSound(sound)
  }

  setActiveOrder = async() =>{
    this.stopSound()
    let order = this.props.order
    let accept = 1
    let driver = this.props.user.id
    await this.props.setActiveOrder(order,accept,driver)
    
  }
  denyOrder = async()=>{
    RootNavigation.navigate('Accepted')
    this.stopSound()
    this.props.modalTimeOut()
    // let order = this.props.order
    // let accept = 0
    // let navigation = this.props.navigation
    // let driver = this.props.user.id
    // await this.props.setActiveOrder(order,accept,navigation,driver)
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
          visible={this.props.ordermodal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={()=>this.denyOrder()} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="cancel" color="red" size={25} />
            <Text style={styles.textStyle}>Decline</Text>
            </TouchableOpacity>

            <View style={{  flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginBottom:10  }}>
            <Text style={styles.textStyle2}>Estimated Fare</Text>
        <Text style={styles.textStyle}>UGX {this.props.order.money}</Text>
        <Text style={styles.textStyle2}>Wallet</Text>
        </View>

            <View style={{  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:10 }}>
            <Text style={styles.textStyle2}>{this.props.order.distance} KM</Text>
        <Text style={styles.textStyle2}>0 Min</Text>
        </View>

            <CountdownCircleTimer
            isPlaying
            duration={200}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}

            onComplete={() => {
             this.props.modalTimeOut()
            }}
        >
            {({ remainingTime }) => <View style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <Image
          style={{width:130,height:130,borderRadius:95}}
          source={require('../../../assets/account.png')}
          // source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
                </View>}
        </CountdownCircleTimer>

       

        <View style={{  flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Oct name="dot-single" color="green" size={70} />
        <Text style={styles.textStyle2}>{this.props.order.from}</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Oct
            name="location-pin"
            color="orange"
            size={40}
        />
        <Text style={styles.textStyle2}>{this.props.order.to}</Text>
        </View>


<TouchableOpacity onPress={()=>this.setActiveOrder()} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
<Icon name="check" color="green" size={25}/>
  <Text style={styles.textStyle}>Accept</Text>
</TouchableOpacity>
            </View>
          </View>
        </Modal>
      
    );
  }
}

function mapStateToProps( state ) {
  return { 
    ordermodal:state.order.notmodal,
    order:state.order.order,
    sound:state.order.sound,
    user:state.auth.user,
    active:state.order.active
  };
}

export default connect(mapStateToProps, actions)(OrderModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 35,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    
   
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  textStyle2: {
    color: "white",
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
  accept:{
    backgroundColor:'green',
    flexDirection:'row',
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
  },
  decline:{
    backgroundColor:'red',
    flexDirection:'row',
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
  }
});
