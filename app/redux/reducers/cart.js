import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_CART_QTY,
    DECREASE_CART_QTY,
    SELECT_ITEM,
    EMPTY_CART,
    CLOSE_INPUT_MODAL,
    QUANTITY_CHANGED,
    SEARCH_STOCK
} from '../actions/types';

const INITIAL_STATE = {
  cart: [],
  quantity:"1",
  qtymodal:false,
  selecteditem:''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return{...state,selecteditem:action.payload,qtymodal:true}
    case CLOSE_INPUT_MODAL:
      return{...state, qtymodal:false}
    case ADD_TO_CART:
         //check for duplicate data
         var duplicate = false
         const setDuplicate = (val) => {
             duplicate = val
         }
         state.cart.forEach(prev => {
             if (prev.id === action.payload.id)
             {
                 setDuplicate(true)
             }
         })

         if (duplicate) {
             return{ ...state, qtymodal:false,quantity:"1"}
         } else {
             return {
                 ...state,
                 cart: [...state.cart, action.payload],
                 qtymodal:false,
                 quantity:"1",
             }
         }
          case REMOVE_FROM_CART:
            return {
              ...state,
              cart: state.cart.map(item =>
                item.id === action.payload.id
                  ? {...cart, selected: false, quantity: 1}
                  : cart,
              ),
            };
    case INCREASE_CART_QTY:
            return {
              ...state,
              cart: state.cart.map(item =>
                item.id == action.payload.item
                  ? {...item, quantity: action.payload.value}
                  : item,
              ),
            };
          case DECREASE_CART_QTY:
            return {
              ...state,
              cart: state.cart.map(item =>
                item.id === action.payload.item.id
                  ? {
                      ...item,
                      quantity: item.quantity !== 1 ? item.quantity - action.payload.quantity : 1,
                    }
                  : item,
              ),
            };
          case EMPTY_CART:
            return {
              ...state,
              cart: state.cart.map(product =>
                product.selected
                  ? {...product, selected: false, quantity: 1}
                  : product,
              ),
            };
            case QUANTITY_CHANGED:
              return{...state,quantity:action.payload}
           
          
    default:
      return state;
  }
}