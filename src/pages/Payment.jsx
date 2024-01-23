import React, {useState} from 'react'

export default function Payment() {

  const [selectedMethod,setSelectedMethod] = useState("basic")
  return (
    <div className='payment-body'>
      <div className='payment-main-content'>
        <div className='billing-info'>
          <div className='billing-info-header'>
            <h4>Billing information</h4>
          </div>
          <div className='billing-info-body'>
            <div className='user-info-preface '>
              <p>
                Your invoice will be issued according to the details listed here.
              </p>
              <button>Add details</button>
            </div>
            <div className='user-billing-info'>
              <h4>Gal1606</h4>
              <p>Israel</p>
            </div>
          </div>
        </div>
        <div className='payment-options'>
          <div className='payment-options-header'>
            <h4>Payment Options</h4>
          </div>
          <div className='payment-options-body'>
            <input id='credit-card' name="credit-card" type='radio' checked={selectedMethod=="credit-card"} onClick={()=>onTabClick("credit-card")}></input>
            <label htmlFor="credit-card">Credit & Debit Cards</label>
          </div>
        </div>
      </div>
      <div className='payment-side-content'>

      </div>
    </div>
  )
}