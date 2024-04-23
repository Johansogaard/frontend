import { cartState, cartAction } from './cartTypes';

export const productReducer = (state: cartState, action: cartAction): cartState => {
  const { type } = action;

  switch (type) {
    case 'PRODUCT_LIST_REQUEST': {
    return{
        ...state,
        isloading:true
    }
  };
  default: 
    return state;
}

};