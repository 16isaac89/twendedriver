import { combineReducers } from 'redux';
import cart from './cart';
import auth from './auth';
import stock from './stock';
import order from './order';
export default combineReducers({
    cart,auth,stock,order
  });