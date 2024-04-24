import React, { useEffect, useState } from 'react'
import { formsManager } from '../checkoutPage-Hooks/formsManager'
import './formComponent.css'


export function FormComponent({
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  vatNumber,
  setVatNumber,
  isEmailValid,
  isPhoneNumberValid,
  isVatNumberValid
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <section className="form">
      <h2>Customer information</h2>
      <form className='form-content' onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderColor: !isEmailValid ? 'red' : '' }}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ borderColor: !isPhoneNumberValid ? 'red' : '' }}
          maxLength={8}
        />

        <input
          type="text"
          name="vatNumber"
          placeholder="VAT number (optional)"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          style={{ borderColor: vatNumber && !isVatNumberValid ? 'red' : '' }}
          maxLength={10}
        />



        {vatNumber && !isVatNumberValid && <p style={{ color: 'red' }}>VAT number is not valid</p>}
      </form>
    </section>
  );
}

function ZipForm() {
  type PostalCodeData = {
    nr: string
    navn: string
  }
  const [postalCode, setPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([])
  const [message, setMessage] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.dataforsyningen.dk/postnumre')
      const data = await response.json()
      setPostalCodes(data)
    }
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPostalCode(value)

    if (value.length === 4) {
      const postalCodeData = postalCodes.find(
        (item: { nr: string; navn: string }) => item.nr === value
      )
      if (postalCodeData) {
        setMessage('')
        setCity(postalCodeData.navn)
      } else {
        setMessage('Postal code is not valid')
        setCity('')
      }
    }
  }

  return (
    <div className='zipform-container'>
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={postalCode}
        onChange={handleChange}
        className="postalCode-input"
        maxLength={4}
      />
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={city}
        readOnly
        className="city-input"
      />
    </div>
  )
}

export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).

