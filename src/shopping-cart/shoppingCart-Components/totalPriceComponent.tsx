import { useCart } from '../shoppingCart-Context/cartContext'




export function TotalPriceComponent() {
const { items, calcTotal, calcItemSubTotal,remainingItemsForDiscount,calcTotalItems } = useCart();
return(
<section className="subtotal">
        <h2>Check out basket</h2>
        {items.map((item) => (
          <div key={item.product.product_id} className="item-subtotal">
            <h3>
              {item.product.product_name} Subtotal: {calcItemSubTotal(item.product.category_id)} DKK
            </h3>
            <p>{remainingItemsForDiscount(item.product.product_id)}</p>
          </div>

          //This Div aligns the subtotal with the item.id and it's row
        ))}

        <div className="total">
          <h2>Total Items</h2>
          <h3>{calcTotalItems()} </h3>
          <h2>Total</h2>
          <h3>
            {parseFloat(calcTotal()) > 300
              ? '10% Discount Applied!'
              : `Add ${(300 - parseFloat(calcTotal())).toFixed(2)} more to get a 10% discount`}
          </h3>
          <h3>{calcTotal()} DKK</h3>
        </div>
      </section>
      )
}