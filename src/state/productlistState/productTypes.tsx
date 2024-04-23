import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

export type ProductState = {
    products: Product[]| null;
    category: Category| null;
    isloading: boolean;
    message: string | null;
};
export type ProductAction =
{

}