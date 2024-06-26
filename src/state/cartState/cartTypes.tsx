import { Item } from '../../models/Item';
import { Product } from '../../models/Product';
export type CartState = {
    items: Item[];


};

export type CartAction =
    | { type: 'CART_ADD_PRODUCT'; payload: { product: Product } }
    | { type: 'CART_REMOVE_PRODUCT'; payload: { product_Id: number } }
    | { type: 'CART_UPDATE_PRODUCT_QUANTITY'; payload: { product_Id: number, quantity: number } }
    | { type: 'CART_CLEAR'; };
