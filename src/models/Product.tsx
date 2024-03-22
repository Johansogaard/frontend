export interface Product {
  product_id: number
  product_name: string
  product_description?: string
  product_price: number
  product_currency: string
  rebateQuantity?: number
  rebatePercent?: number
  upsellProduct_id?: number | null
  category_id: number
  product_image_url?: string
}
