import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,Image,Button,ActivityIndicator,FlatList } from "react-native";
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



class OrderDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data:[
            {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Clark June Boom!", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
            {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",      comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
          ]
        }
      }

  render() {
    
    return (
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.orderdetailsmodal}
          onRequestClose={() => {
          this.props.closeorderdetails()
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>this.props.closeorderdetails()}  style={{alignSelf:'flex-end'}}>
            <AntDesign name="closecircleo" size={34} color="red" />
  </TouchableOpacity>
            <View style={styles.container}>
            <Text  style={styles.name}>From:</Text>
            <Text rkType='primary3 mediumLine'>{this.props.orderdetails.from}</Text>
            <Text  style={styles.name}>To:</Text>
            <Text rkType='primary3 mediumLine'>{this.props.orderdetails.to}</Text>
            <Text  style={styles.name}>Origin Number:</Text>
            <Text rkType='primary3 mediumLine'>{this.props.orderdetails.originnumber}</Text>
            <Text  style={styles.name}>Recipient's Number:</Text>
            <Text rkType='primary3 mediumLine'>{this.props.orderdetails.recipientnumber}</Text>
         
            </View>
            </View>
          </View>
        </Modal>
      
    );
  }
}

function mapStateToProps( state ) {
  return { 
    orderdetailsmodal:state.order.orderdetailsmodal,
    orderdetails:state.order.scanned,
  };
}

export default connect(mapStateToProps, actions)(OrderDetails);

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
    elevation: 5,
    height:'100%',
    width:'100%'
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


  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container2: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});
