import './Checkout.css' // Stien til CSS-fil

const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h2>Kontaktoplysninger</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
              type="email" id="email" placeholder="Indtast din email" /* Check for om det er en korrekt email */
            />
          <label htmlFor="subscribe">Send mails til mig om nyheder og tilbud</label>
          <input
              type="checkbox"
              id="subscribe"
              />
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
        <div className="input-group">
          <label htmlFor="address">Adresse</label>
          <input type="text" id="address" />
        </div>
        <div className="input-group">
          <label htmlFor="zipcode">Postnummer</label>
          <input type="text" id="zipcode" />
        </div>
        <div className="input-group">
          <label htmlFor="city">By</label>
          <input type="text" id="city" />
        </div>
        <div className="input-group">
          <label htmlFor="tel">Telefonnummer</label>
          <input type="text" id="number" pattern='/d{8}' title='Telefon nummer skal være 8 cifre' required /> {/* Check for korrekt tlf nummer */}
        </div>
      </div>
      <div className="order-summary">
        <h2>Din ordre</h2>
        {/* Elements for order summary */}
      </div>
    </div>
  );
};

export default Checkout;
