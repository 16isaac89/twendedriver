// import dependencies
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';

// import colors
import Colors from '../../theme/colors';




export default StyleSheet.create({
    pt16: {paddingTop: 16},
    screenContainer: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
    },
    headerContainer: {
      backgroundColor: Colors.background,
      elevation: 1,
      ...Platform.select({
        ios: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#a7a7aa',
        },
      }),
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
    },
    stepContainer: {
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    bottomActiveBorder:{
      borderBottomWidth:1,
      borderBottomColor:Colors.primaryColor,
      paddingBottom:12
    },
    stepText: {
      color: Colors.primaryColor,
    },
    activeStepText: {
      color: Colors.primaryColor,
      fontWeight:'bold',
      
    },
    line: {
      width: 48,
      height: 1,
      backgroundColor: Colors.primaryColor,
    },
    activeLine: {
      backgroundColor: Colors.primaryColor,
      opacity:0.9
    },
    swiperContainer: {
      flex: 1,
    },
    formContainer: {
      flex: 1,
    },
    form: {
      paddingVertical: 24,
      paddingHorizontal: 20,
    },
    overline: {
      color: Colors.primaryColor,
      textAlign: 'left',
    },
    inputContainerStyle: {
      marginTop: 0,
      marginBottom: 18,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    actionButton: {
      color: Colors.accentColor,
      textAlign: 'center',
    },
    buttonContainer: {
      paddingTop: 16,
      paddingHorizontal: 25,
      paddingBottom: 24,
      backgroundColor: Colors.background,
    },
    linkButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 16,
    },
    linkButton: {
      color: Colors.black,
    },
    orderInfo: {
      paddingVertical: 8,
      textAlign: 'left',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amount: {
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 24,
    },
  });