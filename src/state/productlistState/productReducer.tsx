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
  default: 
    return state;
}

};