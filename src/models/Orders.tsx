export interface Order {
  order_id?: number // Optional for the same reason as above
  order_date: string
  shipping_address: string
  billing_address: string
  total_amount: number
}
