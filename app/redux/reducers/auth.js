import {
   USER_NAME_CHANGED,
   PASSWORD_CHANGED,
   OPEN_CUSTOMER_MODAL,
   CLOSE_CUSTOMER_MODAL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   REG_LOADER,
   LOGIN_OUT,
   GET_LOCATION,
   SHOW_DATE_PICKER,
   HIDE_DATE_PICKER,
   SET_DATE,
   SET_INTERNET_STATE,
   FOLLOW_DRIVER,
   PHONE_NUMBER_CHANGED,
   FULL_NAME_CHANGED,
   EMAIL_CHANGED,
   GET_EARNINGS,
   AUTH_SENDING_FAILED,
   OLD_PASSWORD,
   NEW_PASSWORD,
   CONFIRM_PASSWORD,
   PASSWORD_EDITED,
} from '../actions/types';

const INITIAL_STATE = {
  username:'',
  password:'',
  phone:'',
  fullname:'',
  email:'',
  customermodal:false,
  regloader:false,
  user:"",
  loggedin:false,
  latitude:1.3733,
  longitude:32.2903,
  speed:0,
  datepicker:false,
  selectdate:new Date(),
  hdate:'',
  coordinate:{
    latitude:1.3733,
    longitude:32.2903,
  },
  dateorders:[],
  driverpercent:0,
  internetstate:false,
  internetstatemodal:false,

  routeCoordinates: [],
  distanceTravelled: 0,
  valueprevLatLng: {},
  earnings:'',
  earningstotal:'',
  totaltrips:'',
  confirmpwd:'',
   newpwd:'',
   oldpassword:''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_NAME_CHANGED:
        return{...state, username:action.payload}
    case PASSWORD_CHANGED:
        return{...state, password:action.payload}
    case OPEN_CUSTOMER_MODAL:
      return{...state, customermodal:true}
    case CLOSE_CUSTOMER_MODAL:
      return{...state, customermodal:false}
    case LOGIN_SUCCESS:
      return{...state, user:action.payload,loggedin:true,regloader:false}
   case LOGIN_FAIL:
    return{...state, loggedin:false,regloader:false}
   case REG_LOADER:
    return{...state, regloader:true}
    case LOGIN_OUT:
      return{...state,loggedin:false}
    case GET_LOCATION:
      return{...state,latitude:action.payload.coords.latitude,longitude:action.payload.coords.longitude,speed:action.payload.speed, coordinate:{
        latitude:action.payload.coords.latitude,
        longitude:action.payload.coords.longitude,
      }}
    case SHOW_DATE_PICKER:
      return{...state,datepicker:true}
    case HIDE_DATE_PICKER:
      return{...state,datepicker:false}
    case SET_DATE:
      return{...state,selectdate:action.payload.selectedDate,hdate:action.payload.hdate,datepicker:false,
        regloader:false,dateorders:action.payload.orders,driverpercent:action.payload.percentage}
    case SET_INTERNET_STATE:
      return{...state,internetstate:action.payload,internetstatemodal:action.payload === true ? false : true}
    case FOLLOW_DRIVER:
      return{
        ...state,
        latitude:action.payload.latitude,
        longitude:action.payload.longitude,
        routeCoordinates: action.payload.routeCoordinates,
        distanceTravelled: action.payload.distanceTravelled,
        valueprevLatLng: action.payload.prevLatLng
      }
    case PHONE_NUMBER_CHANGED:
    return{...state,phone:action.payload}
    case FULL_NAME_CHANGED:
      return{...state,fullname:action.payload}
    case EMAIL_CHANGED:
      return{...state,email:action.payload}
    case GET_EARNINGS:
      return{...state,earningstotal:action.payload.earningstotal,totaltrips:action.payload.totaltrips,regloader:false}
    case AUTH_SENDING_FAILED:
      return{...state,regloader:false}
      case OLD_PASSWORD:
        return{...state,oldpassword:action.payload}
      case NEW_PASSWORD:
        return{...state,newpwd:action.payload}
      case CONFIRM_PASSWORD:
        return{...state,confirmpwd:action.payload}
      case PASSWORD_EDITED:
        return{...state,confirmpwd:'',newpwd:'',oldpassword:'',regloader:false}
    default:
      return state;
  }
}