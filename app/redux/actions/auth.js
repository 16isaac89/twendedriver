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
   SET_INTERNET_STATE,
   FOLLOW_DRIVER,
   PHONE_NUMBER_CHANGED,
   FULL_NAME_CHANGED,
   EMAIL_CHANGED,
   OLD_PASSWORD_CHANGED,
   NEW_PASSWORD_CHANGED,
   CONFIRM_PASSWORD_CHANGED,
   GET_TODAY_EARNINGS,
   GET_EARNINGS,
   AUTH_SENDING_FAILED,
   OLD_PASSWORD,
    NEW_PASSWORD,
    CONFIRM_PASSWORD,
} from '../actions/types';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {commonurl} from '../../utils/utilities'
import { NavigationActions } from '@react-navigation/native';


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
                       
                        await AsyncStorage.setItem('driverdata', JSON.stringify(user))
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
        AsyncStorage.removeItem('driverdata');
dispatch({type:LOGIN_OUT})
    }
}

export const checklogin = () =>{
    return async(dispatch)=>{
       let userdata = await AsyncStorage.getItem('driverdata');
       if(userdata){
        let user = JSON.parse(userdata)
        dispatch({type:LOGIN_SUCCESS,payload:user})
       }else{
        dispatch({type:LOGIN_FAIL})
       }
       
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
            console.log(id)
        axios.post(ROOT_URL+"/location/driver", {
            lat:position.coords.latitude,
            lon:position.coords.longitude,
            id:id
         })
             .then( async(response)  => {
               
             })
             .catch(function (error) {
                console.log(error.response)
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
                alert('Failed to send request check your network.')
                dispatch({type:AUTH_SENDING_FAILED})
                 console.log(error.response.message)
                 
             })
        
    }
}


export const updateposition = (latitude,longitude,routeCoordinates,distanceTravelled,prevLatLng) =>{
    return(dispatch)=>{
dispatch({type:FOLLOW_DRIVER,payload:{latitude,longitude,routeCoordinates,distanceTravelled,prevLatLng}})
    }
}


export const emailchanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:EMAIL_CHANGED,payload:text})
    }
}

// export const namechanged = (text) =>{
//     return(dispatch)=>{
//         dispatch({type:FULL_NAME_CHANGED,payload:text})
//     }
// }

export const phonechanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:PHONE_NUMBER_CHANGED,payload:text})
    }
}

export const oldpwdchanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:OLD_PASSWORD_CHANGED,payload:text})
    }
}

export const newpwdchanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:NEW_PASSWORD_CHANGED,payload:text})
    }
}

export const confirmpwdchanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:CONFIRM_PASSWORD_CHANGED,payload:text})
    }
}


export const getearnings = (driver,date) =>{
    return(dispatch)=>{
        dispatch({type:REG_LOADER})
        axios.post(ROOT_URL+"/driver/date/earnings", {
           driver:driver,
           date:date
         })
             .then( async(response)  => {
                let earningstotal = response.data.earningstotal
                let totaltrips = response.data.totaltrips
                let orders = response.data.orders
                console.log("earningstotal,totaltrips")
                console.log(earningstotal,totaltrips)
                dispatch({type:GET_EARNINGS,payload:{earningstotal,totaltrips,orders}})
             })
             .catch(function (error) {
                console.log("error.response")
                console.log(error.response)
                alert('Failed to send request check your network.')
                dispatch({type:AUTH_SENDING_FAILED})
                 console.log(error) 
             })
    }
}



export const oldpassword = (text) =>{
    return(dispatch)=>{
      dispatch({type:OLD_PASSWORD,payload:text})  
    }
}

export const newpassword = (text) =>{
    return(dispatch)=>{
      dispatch({type:NEW_PASSWORD,payload:text})  
    }
}
export const confirmpassword = (text) =>{
    return(dispatch)=>{
      dispatch({type:CONFIRM_PASSWORD,payload:text})  
    }
}


export const sendpasswordchange = (newpwd,oldpwd,confirmpwd,id) =>{

    return(dispatch)=>{
        dispatch({type:REG_LOADER})
        axios.post(ROOT_URL+"/rider/change/pwd", {
          password:newpwd,
          oldpassword:oldpwd,
          id:id
         })
             .then( async(response)  => {
               
                let message = response.data.message
                console.log(response.data)
                alert(message)
            dispatch({type:PASSWORD_EDITED})
             })
             .catch(function (error) {
             console.log(error.response) 
             alert(error.response.data.message)
             dispatch({type:AUTH_SENDING_FAILED})
             })
        
            }
}




