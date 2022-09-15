import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_CART_QTY,
    DECREASE_CART_QTY,
    SELECT_ITEM,
    EMPTY_CART,
    CLOSE_INPUT_MODAL,
    QUANTITY_CHANGED
} from '../actions/types';

import {ToastAndroid } from "react-native";

import {commonurl} from '../../utils/utilities'

const LOCATION_TASK_NAME = 'background-location-task';

const ROOT_URL = commonurl;

export const selectItem = (item) =>{
    return (dispatch)=>{
        dispatch({type:SELECT_ITEM,payload:item})
    }
}

export const addCart = (item) =>{
    return (dispatch)=>{
        dispatch({type:ADD_TO_CART,payload:item})
        ToastAndroid.showWithGravity(
            "Item added to cart...",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    }
}

export const removeCart = (item) =>{
    return (dispatch)=>{
        dispatch({type:REMOVE_FROM_CART,payload:item})
    }
}

export const increaseQty = (item) =>{
    return (dispatch)=>{
        dispatch({type:INCREASE_CART_QTY,payload:{item,quantity}})
    }
}

export const decreaseQty = (item) =>{
    return (dispatch)=>{
        dispatch({type:DECREASE_CART_QTY,payload:{item,quantity}})
    }
}

export const emptyCart = () =>{
    return (dispatch)=>{
        dispatch({type:EMPTY_CART})
    }
}

export const closeInputModal = () =>{
    return(dispatch)=>{
        dispatch({type:CLOSE_INPUT_MODAL})
    }
}

export const quantityChanged = (text) =>{
    return(dispatch)=>{
        dispatch({type:QUANTITY_CHANGED,payload:text})
    }
}


export const cartQty=(item,value)=>{
    return(dispatch)=>{
        dispatch({type:INCREASE_CART_QTY,payload:{item,value}})
    }
}
