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
   SET_INTERNET_STATE
} from '../actions/types';

const INITIAL_STATE = {
  username:'',
  password:'',
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
  internetstatemodal:false
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
      return{...state,latitude:action.payload.latitude,longitude:action.payload.longitude,speed:action.payload.speed, coordinate:{
        latitude:action.payload.latitude,
        longitude:action.payload.longitude,
      }}
    case SHOW_DATE_PICKER:
      return{...state,datepicker:true}
    case HIDE_DATE_PICKER:
      return{...state,datepicker:false}
    case SET_DATE:
      return{...state,selectdate:action.payload.date,hdate:action.payload.hdate,datepicker:false,
        regloader:false,dateorders:action.payload.orders,driverpercent:action.payload.percentage}
    case SET_INTERNET_STATE:
      return{...state,internetstate:action.payload,internetstatemodal:action.payload === true ? false : true}
    default:
      return state;
  }
}