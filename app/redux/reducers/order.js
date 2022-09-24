import {
    SET_NOTIFICATION_ORDER,
    CLOSE_NOTIFICATION_ORDER,
    OPEN_ORDER_MODAL,
    GET_ORDERS,
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
    CLOSE_COMPLETE_ORDERMODAL,
    TXN_CHECK_PASSED,
    OPEN_COMPLETE_ORDERMODAL,
    SEND_FAILED,
    CLEAR_STATE,
    SET_SOUND,
    STOP_SOUND,
    MODAL_ON,
    MODAL_OFF,
    SCAN_COMPLETE,
    SET_TOWN_ACTIVE,
    SELECT_ORDER_STATUS,
    CLOSE_UPCOUNTRY_MODAL,
    OPEN_UPCOUNTRY_MODAL,
    SET_SCANNED
 } from '../actions/types';
 
 const INITIAL_STATE = {
 order:'',
 notmodal:false,
 orders:'',
 cancelled:'',
 completed:'',
 loader:false,
 active:'',
 startmodal:false,
 otp:'',
 orderstatus:'',
 orderid:'',
 orderimage:'https://twende.io/site/assets/img/logos/black-logo.png',
 completeordermodal:false,
 txncheck:'0',
 earning:"0",
 completedstatus:"0",
 sound:'',
 modal:false,
 upcountry:'Select order status',
 upcountrymodal:false,
 scanned:''
 };
 
 export default function(state = INITIAL_STATE, action) {
   switch (action.type) {
     case SET_NOTIFICATION_ORDER:
         return{...state, order:action.payload.notifications,sound:action.payload.sound,notmodal:true}
    case CLOSE_NOTIFICATION_ORDER:
        return{...state, order:"",notmodal:false}
    case OPEN_ORDER_MODAL:
        return{...state,notmodal:true}
    case GET_ORDERS:
      return{...state,
        orders:action.payload.orders,
        cancelled:action.payload.cancelled,
        completed:action.payload.completed,
        orders:action.payload.orders,
        cancelled:action.payload.cancelled,
        completed:action.payload.completed,
        modal:false}
    case ORDER_LOADER:
      return{...state,loader:true}
    case SET_ACTIVE_ORDER:
      return{...state,active:action.payload,order:'',orderstatus:action.payload.status,modal:false,notmodal:false}
    case SET_TOWN_ACTIVE:
      return{...state,active:action.payload,order:'',orderstatus:action.payload.status,completeordermodal:true}
    case CHECK_ACTIVE_ORDER:
      return{...state,active:action.payload}
    case OTP_CHANGED:
      return{...state,otp:action.payload}
    case OPEN_OTP_MODAL:
      return{...state,startmodal:true,}
    case CLOSE_OTP_MODAL:
      return{...state,startmodal:false,completeordermodal:false}
    case OPEN_LOADER:
      return{...state,loader:true}
    case OTP_SENT:
      return{...state,loader:false,otp:'',startmodal:false,orderstatus:action.payload.status}
    case ORDER_ID_CHANGED:
      return{...state,orderid:action.payload}
    case ORDER_COMPLETE_IMAGE:
      return{...state,orderimage:action.payload,completeordermodal:true}
    case OPEN_COMPLETE_ORDERMODAL:
      return{...state,completeordermodal:true}
    case CLOSE_COMPLETE_ORDERMODAL:
      return{...state,completeordermodal:false}
    case ORDER_COMPLETED:
      return{...state,orderstatus:action.payload.status,earning:action.payload.income,completedstatus:"1"}
    case TXN_CHECK_PASSED:
      return{...state,txncheck:'1',loader:false,completeordermodal:false,}
    case SEND_FAILED:
      return{...state,loader:false,modal:false}
    case CLEAR_STATE:
      return{...state,loader:false,txncheck:'0',active:'',otp:'',orderid:'',completedstatus:"0"}
    case SET_SOUND:
      return{...state,sound:action.payload}
    case STOP_SOUND:
      return{...state,sound:''}
    case MODAL_ON:
      return{...state,modal:true}
    case MODAL_OFF:
      return{...state,modal:false,notmodal:false,order:''}
    case SCAN_COMPLETE:
      return{...state,modal:false,scanned:'',upcountry:'Select order status',
      upcountrymodal:false,}
    case SELECT_ORDER_STATUS:
      return{...state,upcountry:action.payload}
    case OPEN_UPCOUNTRY_MODAL:
      return{...state,upcountrymodal:true}
    case CLOSE_UPCOUNTRY_MODAL:
      return{...state,upcountrymodal:false}
    case SET_SCANNED:
      return{...state,scanned:action.payload,upcountrymodal:true}
     default:
       return state;
   }
 }