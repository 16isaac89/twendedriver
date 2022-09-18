import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,ActivityIndicator} from "react-native";

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class App extends Component {
 

  render() {
    return (
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#00ff00" />
            </View>
          </View>
        </Modal>
       
   
    );
  }
}

function mapStateToProps( state ) {
    return { 
      modal:state.order.modal,
    };
  }
  
  export default connect(mapStateToProps, actions)(App);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

