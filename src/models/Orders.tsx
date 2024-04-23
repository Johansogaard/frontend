export interface Order {
  order_id?: number // Optional for the same reason as above
  customer_id: number
  order_date: Date
  shipping_address: string
  billing_address: string
  total_amount: number
}
