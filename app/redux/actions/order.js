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
    STOP_SOUND,
    MODAL_ON,
    ORDER_ASSIGNED_CLOSE,
    MODAL_OFF,
    SET_TOWN_ACTIVE,
    SELECT_ORDER_STATUS,
    CLOSE_UPCOUNTRY_MODAL,
    OPEN_UPCOUNTRY_MODAL,
    SET_SCANNED,
    SENDING_ORDER
 } from '../actions/types';
 import axios from 'axios'
 import {commonurl} from '../../utils/utilities'
 import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment-timezone'

import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import Sound from 'react-native-sound'
import RootNavigation from '../../navigation/RootNavigation'
Sound.setCategory('Playback');



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
      var sound = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
         if (error) {
           console.log('failed to load the sound', error);
           return;
         }
         // loaded successfully
         console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
       
         // Play the sound with an onEnd callback
         sound.play((success) => {
           if (success) {
             console.log('successfully finished playing');
           } else {
             console.log('playback failed due to audio decoding errors');
           }
         });
       });
       sound.setNumberOfLoops(-1);
        dispatch({type:SET_NOTIFICATION_ORDER,payload:{notifications,sound}});
        
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
      dispatch({type:ORDER_LOADER});
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

 export const upDateOrder = (latitude,longitude,order,id,orderstatus,navigation) =>{
    return async(dispatch)=>{
        dispatch({type:MODAL_ON})
        axios.post(ROOT_URL+"/driver/scan", {
            latitude:latitude,
            longitude:longitude,
            order:order,
            id:id,
            orderstatus:orderstatus
         })
             .then( async(response)  => {
               alert(response.data.message)
                 dispatch({type:SCAN_COMPLETE})
                 navigation.navigate("Town");
             })
             .catch(function (error) {
                dispatch({type:SEND_FAILED})
                alert('Failed please try again')
                 console.log(error.response)
             })
    }
 }

 export const setActiveOrder = (item,accept,driver) =>{
    return async(dispatch)=>{
      dispatch({type:MODAL_ON})
      let id = item.id
      axios.post(ROOT_URL+"/order/accept", {
         order:id,
         accept:accept,
         driver:driver
      })
          .then( async(response)  => {
            // if(accept === 1){
            await AsyncStorage.setItem('activeorder', JSON.stringify(item))
            dispatch({type:SET_ACTIVE_ORDER,payload:item})
            RootNavigation.navigate('Accepted')
            //navigation.navigate("Accepted");
            // }else{
            //    await AsyncStorage.removeItem('activeorder')
            //    dispatch({type:MODAL_OFF})
            // }
          })
          .catch(function async(error) {
            AsyncStorage.removeItem('activeorder')
             dispatch({type:SEND_FAILED})
              console.log(error.response)
          })

      
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
        
      //   let address = ""
     
      //   const  {timezone}  = await Localization.getLocalizationAsync();
      //  let { status } = await Location.requestForegroundPermissionsAsync();
      //    if (status !== 'granted') {
      //      setErrorMsg('Permission to access location was denied');
      //      return;
      //    }
      //    let location = await Location.getCurrentPositionAsync({});
      //     let time = await moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
      //     const { latitude, longitude } = location.coords ;
      //  let response = await Location.reverseGeocodeAsync({
      //    latitude,
      //    longitude
      //  });
      //  for (let item of response) {
      //     address = `${item.name}, ${item.street}, ${item.city}`;
      //  }
      //   axios.post(ROOT_URL+"/order/check/otp", {
      //       id:id,
      //       status:'started',
      //       otp:otp,
      //       address:address,
      //       startlat:latitude,
      //       startlongitude:longitude,
      //       time:time
      //    })
      //        .then( async(response)  => {
      //           let status = response.data.status
      //           if(status === 1){
      //               let order = response.data.order
      //               let status = response.data.order.status
      //               await AsyncStorage.setItem('activeorder', JSON.stringify(order))
      //                dispatch({type:OTP_SENT,payload:status})
      //           }else{
      //               alert('Wrong otp please try again')
      //           }
               
      //        })
      //        .catch(function (error) {
      //           dispatch({type:SEND_FAILED})
      //            console.log(error.response)
      //        })
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
        dispatch({type:SENDING_ORDER})
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



 export const orderCompleted =(id,driver,navigation)=>{
    return async(dispatch)=>{
      // dispatch({type:SENDING_ORDER})
      //   let address = ""
     
      //   const  {timezone}  = await Localization.getLocalizationAsync();
      //  let { status } = await Location.requestForegroundPermissionsAsync();
      //    if (status !== 'granted') {
      //      setErrorMsg('Permission to access location was denied');
      //      return;
      //    }
      //    let location = await Location.getCurrentPositionAsync({});
      //     let time = await moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
      //     const { latitude, longitude } = location.coords ;
      //  let response = await Location.reverseGeocodeAsync({
      //    latitude,
      //    longitude
      //  });
      //  for (let item of response) {
      //     address = `${item.name}, ${item.street}, ${item.city}`;
      //  }
      //   axios.post(ROOT_URL+"/order/complete", {
      //       id:id,
      //       address:address,
      //       endlat:latitude,
      //       endlongitude:longitude,
      //       time:time,
      //       driver:driver
      //    })
      //        .then( async(response)  => {
      //          let orders = response.data.orders
      //          let cancelled = response.data.cancelled
      //          let completed = response.data.completed
      //           //dispatch({type:GET_ORDERS,payload:{orders,cancelled,completed}})
      //           let status = response.data.order.status
      //           let income = response.data.income
      //           console.log(completed)
      //           await AsyncStorage.removeItem('activeorder');
      //           alert('Order has been completed')
      //            dispatch({type:ORDER_COMPLETED,payload:{status,income,orders,cancelled,completed}})
      //            navigation.navigate('TopBar')
      //        })
      //        .catch(function (error) {
      //           dispatch({type:SEND_FAILED})
      //            console.log(error.response)
      //        })
    }
 }


 export const listenorder = () =>{
return()=>{
   window.Pusher = Pusher;
   Pusher.logToConsole = true;

   let PusherClient = new Pusher('mojskin-developer',{
      cluster: "mt1",
       wsHost: '127.0.0.1',
       wssPort: '6001',
       wsPort: '6001',
       enabledTransports: ["ws"],
       // forceTLS: false,
       enableStats: true,
       forceTLS: false
   });

   let echo = new Echo({
       broadcaster: 'pusher',
       client: PusherClient,
   });

   echo.channel('order.'+'445').listen('OrderAssignment', (e) => {
       console.log(e)
       dispatch({type:ORDER_ASSIGNED_CLOSE})
   });
}
 }


 export const setActiveTown = (item) =>{
   return(dispatch)=>{
      dispatch({type:SET_TOWN_ACTIVE,payload:item})
   }
 }

 export const upcountrystatus = (status) =>{
   return (dispatch)=>{
      dispatch({type:SELECT_ORDER_STATUS,payload:status})
   }
 }

 
 export const openupcountrymodal = () =>{
return(dispatch)=>{
   dispatch({type:OPEN_UPCOUNTRY_MODAL})
}
 }

 export const closeupcountrymodal = () =>{
   return(dispatch)=>{
      dispatch({type: CLOSE_UPCOUNTRY_MODAL})
   }
}
export const setscanned = (order) =>{
   return(dispatch)=>{
      dispatch({type: SET_SCANNED,payload:order})
   }
}
 