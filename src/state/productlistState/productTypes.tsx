import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

export type ProductState = {
    products: Product[]| null;
    category: Category| null;
    isloading: boolean;
    message: string | null;
};
export type ProductAction =
| { type: 'PRODUCT_LIST_REQUEST'; }
| { type: 'PRODUCT_LIST_SUCCESS'; payload: {products : Product[]}}
| { type: 'PRODUCT_LIST_FAILURE'}
| { type: 'PRODUCT_LIST_CATEGORY'; payload: {category: Category}}