import {
   USER_NAME_CHANGED,
   PASSWORD_CHANGED,
   OPEN_CUSTOMER_MODAL,
   CLOSE_CUSTOMER_MODAL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   REG_LOADER,
   LOGIN_OUT,
   GET_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
  username:'',
  password:'',
  customermodal:false,
  regloader:false,
  user:"",
  loggedin:false,
  latitude:8.7832,
  longitude:34.5085,
  speed:0
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
      return{...state,latitude:action.payload.latitude,longitude:action.payload.longitude,speed:action.payload.speed}
    default:
      return state;
  }
}