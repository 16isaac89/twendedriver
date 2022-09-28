import {
   USER_NAME_CHANGED,
   PASSWORD_CHANGED,
   OPEN_CUSTOMER_MODAL,
   CLOSE_CUSTOMER_MODAL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   REG_LOADER,
   LOGIN_OUT,
   TOKEN_SENT,
   GET_LOCATION,
   SHOW_DATE_PICKER,
   HIDE_DATE_PICKER,
   SET_DATE,
   SET_INTERNET_STATE
} from '../actions/types';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {commonurl} from '../../utils/utilities'
import { NavigationActions } from '@react-navigation/native';

const LOCATION_TASK_NAME = 'background-location-task';

const ROOT_URL = commonurl;

export const usernameChanged = (text) =>{
    return async(dispatch)=>{
dispatch({type:USER_NAME_CHANGED,payload:text})
    }
}

export const passwordChanged = (text) =>{
    return async(dispatch)=>{
dispatch({type:PASSWORD_CHANGED,payload:text})
    }
}


export const openCustModal = () =>{
    return async(dispatch)=>{
dispatch({type:OPEN_CUSTOMER_MODAL})
    }
}

export const closeCustModal = () =>{
    return async(dispatch)=>{
dispatch({type:CLOSE_CUSTOMER_MODAL})
    }
}

export const loginuser = (username,password) =>{
    return async(dispatch)=>{
        dispatch({type:REG_LOADER})
                axios.post(ROOT_URL+"/login/driver", {
                   username:username,
                   password:password,
                })
                    .then( async(response)  => {
                        let user = response.data.driver
                        console.log("user data")
                        console.log(user)
                        await AsyncStorage.setItem('userdata', JSON.stringify(user))
                        dispatch({type:LOGIN_SUCCESS,payload:user})
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        dispatch({type:LOGIN_FAIL})
                    })
                   
    }
}


export const logout = () =>{
    return async(dispatch)=>{
        AsyncStorage.removeItem('userdata');
dispatch({type:LOGIN_OUT})
    }
}

export const checklogin = () =>{
    return async(dispatch)=>{
       let userdata = await AsyncStorage.getItem('userdata');
       let user = JSON.parse(userdata)
       dispatch({type:LOGIN_SUCCESS,payload:user})
    }
}
// axios.get('/GeeksforGeeks', {
//     params: {
//         articleID: articleID
//     }
// })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });  

//await AsyncStorage.getItem(ACCESS_TOKEN);
//console.log(JSON.parse(value));

export const saveNotificationToken = (token) =>{
    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
       
    if(userdata){
    let user = JSON.parse(userdata).id
       axios.post(ROOT_URL+"/token/driver", {
        id:user,
        token:token,
     })
         .then( async(response)  => {
             dispatch({type:TOKEN_SENT})
         })
         .catch(function (error) {
             console.log(error.response)
         })
        }
    }  
}






 export const updateLocation = (position) =>{
    return async(dispatch)=>{
        let userdata = await AsyncStorage.getItem('userdata');
        dispatch({type:GET_LOCATION,payload:position})
        if(userdata){
            let id = JSON.parse(userdata).id
        axios.post(ROOT_URL+"/location/driver", {
            lat:position.latitude,
            lon:position.longitude,
            id:id
         })
             .then( async(response)  => {
               
             })
             .catch(function (error) {
                 console.log(error.response.message)
                 
             })

            }
    }
  }


//   export const navigates = (navigation)=>{
//     return (dispatch)=>{
//         navigation.navigate("Town");
//     }
//   }

export const showdate = () =>{
    return(dispatch)=>{
dispatch({type:SHOW_DATE_PICKER})
    }
}

export const setinternetstate = (state) =>{
   
    return(dispatch)=>{
dispatch({type:SET_INTERNET_STATE,payload:state})
    }
}

export const hidedate = () =>{
    return(dispatch)=>{
        dispatch({type:HIDE_DATE_PICKER})
    }
}

export const setdate = (selectedDate,hdate,date,driver) =>{
    return(dispatch)=>{
        dispatch({type:REG_LOADER})
        axios.post(ROOT_URL+"/driver/date/orders", {
           date:date,
           driver:driver
         })
             .then( async(response)  => {
                let orders = response.data.orders
                let percentage = response.data.driver
                dispatch({type:SET_DATE,payload:{selectedDate,hdate,orders,percentage}})
             })
             .catch(function (error) {
                 console.log(error.response.message)
                 
             })
        
    }
}



