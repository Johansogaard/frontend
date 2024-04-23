import { ProductState, ProductAction } from './productTypes';

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  const { type } = action;

  switch (type) {
    case 'PRODUCT_LIST_REQUEST': {
    return{
        ...state,
        isloading:true
    }

  };
    case 'PRODUCT_LIST_SUCCESS': {
    return{
        ...state,
        isloading:false,
        products: action.payload.items,
        message: 'PRODUCT_LIST_SUCCESS'
    }
  default: 
    return state;
}

};