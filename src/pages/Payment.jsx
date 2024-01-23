import React, { useState } from 'react';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("basic");

  const onTabClick = (method) => {
    setSelectedMethod(method);
  };

  const renderCreditCardInputs = () => {
    if (selectedMethod === 'credit-card') {
      return (
        <>
          <input type="text" placeholder="Credit Card Number" />
          <input type="text" placeholder="Expiration Date (MM/YY)" />
          <input type="text" placeholder="Security Code" />
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </>
      );
    }
    return null;
  };

  return (
    <div className='payment-body'>
      <div className='payment-main-content'>
        <div className='billing-info'>
          <div className='billing-info-header'>
            <h4>Billing information</h4>
          </div>
          <div className='billing-info-body'>
            <div className='user-info-preface'>
              <p>Your invoice will be issued according to the details listed here.</p>
            </div>
            <div className='user-billing-info'>
              <h4>Gal1606</h4>
              <p>Israel</p>
            </div>
            <button>Add details</button>
          </div>
        </div>
        <div className='payment-options'>
          <div className='payment-options-header'>
            <h4>Payment Options</h4>
          </div>
          <div className='payment-options-body'>
            <div className='radio-wrapper'>
              <input
                id='credit-card'
                name="payment-method"
                type='radio'
                checked={selectedMethod === "credit-card"}
                onClick={() => onTabClick("credit-card")}
              />
              <label htmlFor="credit-card">Credit & Debit Cards</label>
            </div>
            {renderCreditCardInputs()}
            <div className='radio-wrapper'>
              <input
                id='paypal'
                name="payment-method"
                type='radio'
                checked={selectedMethod === "paypal"}
                onClick={() => onTabClick("paypal")}
              />
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
        </div>
      </div>
      <div className='payment-side-content'>
        {/* ... other content ... */}
      </div>
    </div>
  );
}
