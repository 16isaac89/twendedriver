import {
    SEARCH_STOCK
} from '../actions/types';
import {commonurl} from '../../utils/utilities'

const LOCATION_TASK_NAME = 'background-location-task';

const ROOT_URL = commonurl;

export const searchstock = (text) =>{
    return (dispatch)=>{
        dispatch({type:SEARCH_STOCK,payload:text})
    }
}