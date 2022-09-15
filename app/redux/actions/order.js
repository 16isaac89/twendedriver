import {
    SET_NOTIFICATION_ORDER,
    CLOSE_NOTIFICATION_ORDER,
    OPEN_ORDER_MODAL,
    GET_ORDERS,
    SCAN_COMPLETE,
    ORDER_LOADER,
    SET_ACTIVE_ORDER,
    CHECK_ACTIVE_ORDER,
    OTP_CHANGED,
    OPEN_OTP_MODAL,
    CLOSE_OTP_MODAL,
    OPEN_LOADER,
    OTP_SENT,
    ORDER_COMPLETED,
    ORDER_ID_CHANGED,
    ORDER_COMPLETE_IMAGE,
    OPEN_COMPLETE_ORDERMODAL,
    CLOSE_COMPLETE_ORDERMODAL,
    TXN_CHECK_PASSED,
    SEND_FAILED,
    CLEAR_STATE,
    SET_SOUND,
    STOP_SOUND
 } from '../actions/types';
 import axios from 'axios'
 import {commonurl} from '../../utils/utilities'
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import * as Localization from 'expo-localization';
 import * as Location from 'expo-location';
import moment from 'moment-timezone'
import { Audio } from 'expo-av';

 const LOCATION_TASK_NAME = 'background-location-task';
 
 const ROOT_URL = commonurl;
 CLEAR_STATE

 export const closecompletemodal = () =>{
    return (dispatch)=>{
        dispatch({type:CLOSE_COMPLETE_ORDERMODAL});
    }
 }

 export const clearstate = () =>{
    return (dispatch)=>{
        dispatch({type:CLEAR_STATE});
    }
 }


 export const opencompletemodal = () =>{
    return (dispatch)=>{
        dispatch({type:OPEN_COMPLETE_ORDERMODAL});
    }
 }
 
 export const orderNotification = (notifications) =>{
    return async(dispatch)=>{
      const { sound } = await Audio.Sound.createAsync(
         require('../../../assets/order.wav')
      );
      await sound.playAsync();
      //dispatch({type:SET_SOUND,payload:sound})
        dispatch({type:SET_NOTIFICATION_ORDER,payload:{notifications,sound}});
   //      setTimeout( async()=> {
   //         await sound.stopAsync()
   //          await sound.unloadAsync()
   //   }, 5000);
    }
 }

  playSound = async()=> {
   
   const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/order.wav')
   );
   await sound.playAsync(); 
   return async(dispatch)=>{
   dispatch({type:SET_SOUND,payload:sound})
   }
}

export const stopSound = async(sound)=> {
   await sound.stopAsync()
   await sound.unloadAsync()
   return async(dispatch)=>{
   dispatch({type:STOP_SOUND})
   }
}

 export const otpchanged = (text) =>{
    return (dispatch)=>{
        dispatch({type:OTP_CHANGED,payload:text});
    }
 }

 export const ordercompleteimage = (uri) =>{
    return (dispatch)=>{
        dispatch({type:ORDER_COMPLETE_IMAGE,payload:uri});
    }
 }


 export const orderidchanged = (text) =>{
    return (dispatch)=>{
        dispatch({type:ORDER_ID_CHANGED,payload:text});
    }
 }

 export const otpmodalo = () =>{
    return (dispatch)=>{
        dispatch({type:OPEN_OTP_MODAL});
    }
 }
 export const otpmodalc = (text) =>{
    return (dispatch)=>{
        dispatch({type:CLOSE_OTP_MODAL});
    }
 }


 export const modalTimeOut = () =>{
    return (dispatch)=>{
        dispatch({type:CLOSE_NOTIFICATION_ORDER});
    }
 }
 export const orderloader = () =>{
    return (dispatch)=>{
        dispatch({type:ORDER_LOADER});
    }
 }

 export const openModal = () =>{
    return (dispatch)=>{
        dispatch({type:OPEN_ORDER_MODAL});
    }
 }

 export const getOrders=(id)=>{
    return async(dispatch)=>{
        axios.post(ROOT_URL+"/driver/orders", {
            id:id
         })
             .then( async(response)  => {
               
                let orders = response.data.orders
                let cancelled = response.data.cancelled
                let completed = response.data.completed
                 dispatch({type:GET_ORDERS,payload:{orders,cancelled,completed}})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }

 export const upDateOrder = (latitude,longitude,order,id) =>{
    return async(dispatch)=>{
        dispatch({type:ORDER_LOADER})
        axios.post(ROOT_URL+"/driver/scan", {
            latitude:latitude,
            longitude:longitude,
            order:order,
            id:id
         })
             .then( async(response)  => {
               
               alert(response.data.message)
                 dispatch({type:SCAN_COMPLETE})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }

 export const setActiveOrder = (item) =>{
    return async(dispatch)=>{
        await AsyncStorage.setItem('activeorder', JSON.stringify(item))
        dispatch({type:SET_ACTIVE_ORDER,payload:item})
    }
 }
 export const checkActiveOrder = (item) =>{
    return async(dispatch)=>{
        let active = await AsyncStorage.getItem('activeorder');
       let item = JSON.parse(active)
        dispatch({type:CHECK_ACTIVE_ORDER,payload:item})
    }
 }

 export const sendOtp=(id,otp)=>{
    return async(dispatch)=>{
        dispatch({type:OPEN_LOADER})
        let address = ""
     
        const  {timezone}  = await Localization.getLocalizationAsync();
       let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
           setErrorMsg('Permission to access location was denied');
           return;
         }
         let location = await Location.getCurrentPositionAsync({});
          let time = await moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
          const { latitude, longitude } = location.coords ;
       let response = await Location.reverseGeocodeAsync({
         latitude,
         longitude
       });
       for (let item of response) {
          address = `${item.name}, ${item.street}, ${item.city}`;
       }
        axios.post(ROOT_URL+"/order/check/otp", {
            id:id,
            status:'started',
            otp:otp,
            address:address,
            startlat:latitude,
            startlongitude:longitude,
            time:time
         })
             .then( async(response)  => {
                let status = response.data.status
                if(status === 1){
                    let order = response.data.order
                    let status = response.data.order.status
                    await AsyncStorage.setItem('activeorder', JSON.stringify(order))
                     dispatch({type:OTP_SENT,payload:status})
                }else{
                    alert('Wrong otp please try again')
                }
               
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }


 export const sendStatus=(id,message)=>{
    return async(dispatch)=>{
        dispatch({type:OPEN_LOADER})
        axios.post(ROOT_URL+"/order/add/status", {
            id:id,
            status:message,
         })
             .then( async(response)  => {
                    let order = response.data.order
                    let status = response.data.order.status
                    await AsyncStorage.setItem('activeorder', JSON.stringify(order))
                     dispatch({type:OTP_SENT,payload:status})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }


 export const checkTxn = (id,txn) => {
    return async(dispatch)=>{
        dispatch({type:OPEN_LOADER})
        axios.post(ROOT_URL+"/order/checktxn", {
            id:id,
            txn:txn,
         })
             .then( async(response)  => {
                    let status = response.data.status
                    console.log(status)
                   if(status === 1){
                    dispatch({type:TXN_CHECK_PASSED,payload:1})
                    alert('Passed')
                   }else{
                    alert('Failed')
                    dispatch({type:SEND_FAILED})
                   }
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }



 export const orderStarted =(id)=>{
    return async(dispatch)=>{
        axios.post(ROOT_URL+"/order/started", {
            id:id,
            status:'started'
         })
             .then( async(response)  => {
                let order = response.data.order
                await AsyncStorage.setItem('activeorder', JSON.stringify(order))
                 dispatch({type:OTP_SENT,payload:order})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }

 export const cancelOrder =(id,driver)=>{
    return async(dispatch)=>{
        axios.post(ROOT_URL+"/order/cancel", {
            id:id,
            driver:driver
         })
             .then( async(response)  => {
                let order = response.data.order
                await AsyncStorage.removeItem('activeorder')
                 dispatch({type:OTP_SENT,payload:order})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }



 export const orderCompleted =(id,driver)=>{
    return async(dispatch)=>{
         dispatch({type:OPEN_LOADER})
        let address = ""
     
        const  {timezone}  = await Localization.getLocalizationAsync();
       let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
           setErrorMsg('Permission to access location was denied');
           return;
         }
         let location = await Location.getCurrentPositionAsync({});
          let time = await moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
          const { latitude, longitude } = location.coords ;
       let response = await Location.reverseGeocodeAsync({
         latitude,
         longitude
       });
       for (let item of response) {
          address = `${item.name}, ${item.street}, ${item.city}`;
       }
        axios.post(ROOT_URL+"/order/complete", {
            id:id,
            address:address,
            endlat:latitude,
            endlongitude:longitude,
            time:time,
            driver:driver
         })
             .then( async(response)  => {
                let status = response.data.order.status
                let income = response.data.income
                await AsyncStorage.removeItem('activeorder');
                 dispatch({type:ORDER_COMPLETED,payload:{status,income}})
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                 console.log(error.response)
             })
    }
 }

 