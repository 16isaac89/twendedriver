import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class Nonetwork extends Component {
  state = {
    modalVisible: true
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
    
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.internetstatemodal}
          onRequestClose={() => {
           alert('Fix internet connection')
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Internet Connection!</Text>
              <Text style={styles.textStyle}>Oops! It seems you are not connected to the internet or your internet connection has a problem.</Text>
            </View>
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width:"100%"
  },
  modalView: {
   
    backgroundColor: "white",
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
    elevation: 5,
    
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
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
function mapStateToProps( state ) {
    return { 
        internetstatemodal:state.auth.internetstatemodal,
    };
  }
  
  export default connect(mapStateToProps, actions)(Nonetwork);
