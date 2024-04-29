import { Item } from './Item'
export interface Receipt {
  order_id: string
    shipping_address: string
  billing_address: string
  total_amount: number
  items: Item[]
}

