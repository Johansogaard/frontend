import './Checkout.css' // Stien til CSS-fil

const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h2>Kontaktoplysninger</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
              type="email"
              id="email"
              placeholder="Indtast din email"
            />
          <input
              type="checkbox"
              id="subscribe"
            />
          <label htmlFor="subscribe">Send mails til mig om nyheder og tilbud</label>
        </div>
        <h2>Levering</h2>
        <div className="input-group"> 
          <label htmlFor="country">Land/område</label>
          <select id="country">
            <option value="denmark">Danmark</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="firstname">Fornavn</label>
          <input type="text" id="firstname" />
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Efternavn</label>
          <input type="text" id="lastname" />
        </div>
        {/* Add more input fieds here */}
      </div>
      <div className="order-summary">
        <h2>Din ordre</h2>
        {/* Elements for order summary */}
      </div>
    </div>
  );
};

export default Checkout;
