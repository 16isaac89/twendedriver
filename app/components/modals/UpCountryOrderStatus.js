import React, { Component,Fragment } from "react";
import { Alert, Modal, StyleSheet,View,Text,TouchableOpacity,ActivityIndicator} from "react-native";

import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { AntDesign,Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';


var items = [
    {
      id: 1,
      name: 'Enroute',
    },
    {
      id: 2,
      name: 'Completed',
    },
   
  ];
class App extends Component {
   
 
    selectStatus=(item) =>{
        let status = ""
        if(item.id === 1){
            status = "enroute"
        }else{
            status = "completed"
        }
        this.props.upcountrystatus(status)
    }

    upcountrychangestatus = async() => {
        if(this.props.upcountry === 'Select order status'){
            alert('Please select order status')
        }else{
        let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
            let navigation = navigation
            let location = await Location.getCurrentPositionAsync({});
            let latitude = location.coords.latitude
            let longitude = location.coords.longitude
            let order = this.props.scanned
            let id = this.props.user.id
            let orderstatus = this.props.upcountry
            this.props.upDateOrder(latitude,longitude,order,id,orderstatus,navigation)
        }
        };
  render() {
    return (
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.upcountrymodal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>this.props.closeupcountrymodal()}  style={{alignSelf:'flex-end'}}>
            <AntDesign name="closecircleo" size={34} color="red" />
  </TouchableOpacity>
                <Text>Select order status</Text>
            <Fragment>
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
              this.selectStatus(item)
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: items });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: this.props.upcountry,
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
      <TouchableOpacity onPress={()=>this.upcountrychangestatus()}  style={{alignSelf:'flex-end'}}>
        <Feather name="check-circle" size={34} color="green" />
</TouchableOpacity>
            </View>
          </View>
        </Modal>
       
   
    );
  }
}

function mapStateToProps( state ) {
    return { 
      upcountrymodal:state.order.upcountrymodal,
      upcountry:state.order.upcountry,
      user:state.auth.user,
      scanned:state.order.scanned,
      loader:state.order.loader
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

