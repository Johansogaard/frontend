import { ProductState, ProductAction } from './productTypes';

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  const { type } = action;

  switch (type) {
    case 'PRODUCT_LIST_REQUEST':
      return {
        ...state,
        isloading: true,
        products: null,
        message: 'Requesting products',
      };

    case 'PRODUCT_LIST_SUCCESS':
      return {
        ...state,
        isloading: false,
        products: action.payload.products,
        message: 'PRODUCT_LIST_SUCCESS',
      };
    case 'PRODUCT_LIST_FAILURE':
      return {
        ...state,
        isloading: false,
        products: null,
        message: 'PRODUCT_LIST_FAILURE',
      }
    case 'PRODUCT_LIST_CATEGORY':
      return {
        ...state,
        isloading: false,
        category: action.payload.category,
        message: 'PRODUCT_LIST_FAILURE',
      }

      case 'GUEST_SET':
      return {
        ...state,
        guestToken: action.payload.guestToken
      }

    default:
      return state;

  }
};