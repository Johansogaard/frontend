// import React, { useState } from "react";
import './Checkout.css' // Stien til CSS-fil


const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-form">
        <h2>Kontaktoplysninger</h2>
        {/* Indsætter formular for kontaktoplysninger */}
        
        <h2>Levering</h2>
        {/* Formular for leveringsoplysninger */}
      </div>

      <div className="order-summary">
        <h2>Din ordre</h2>
        {/* Elementer for ordresammen drag */}
      </div>
    </div>
  );
};

export default Checkout;
