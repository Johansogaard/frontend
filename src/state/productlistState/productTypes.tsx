import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

export type ProductState = {
    products: Product[];
    category: Category;
    isloading: boolean;

};
export type ProductAction =
{
    
}