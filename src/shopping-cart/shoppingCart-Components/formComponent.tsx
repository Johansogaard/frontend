import React, { useEffect, useState } from 'react'
import { formsManager } from '../shoppingCart-Hooks/formsManager'

export function FormComponent() {
    const {email,phoneNumber,vatNumber,setEmail,setPhoneNumber,setVatNumber,isEmailValid,isPhoneNumberValid,isVatNumberValid } = formsManager();
    return (
        <section className="form">
        <h2>Contact Information</h2>
        <form>
          <input type="email" name="email" placeholder="Indtast din email" required value={email} onChange={(e) => setEmail(e.target.value)} 
          style={{ borderColor: isEmailValid ? 'green' : 'red' }} // Visuel feedback med grænsefarve rød eller grøn når det er korrekt/forkert/
          />
          {!isEmailValid && <p style={{ color: 'red' }}>Emailen er ikke gyldig.</p>} 
          <h2>Delivery</h2>
          <select id="country" name="country" required>
            <option value="dk">Denmark</option>
            
          </select>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="small-input"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="small-input"
            />
          </div>
          

        <input type="text" name="company" placeholder="Company VAT number (optional)" value={vatNumber} onChange={(e) => setVatNumber(e.target.value) } 
          style={{ borderColor: isVatNumberValid ? 'green' : 'red' }} maxLength={8} required
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}/>
          <input type="text" name="address" placeholder="Address" 
        />
        {!isVatNumberValid && <p style={{ color: 'red' }}>VAT-nummeret skal være 8 cifre langt.</p>} 

          <ZipForm />

        <input type="tel" 
        name="phone"  placeholder='Phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} 
        style={{ borderColor: isPhoneNumberValid ? 'green' : 'red' }} required
        onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
         }
         }}
         maxLength={8}
        /> 
       {!isPhoneNumberValid && <p style={{ color: 'red' }}>Telefonnummeret er forkert.</p>}
          <input type="text" name="Other billing address" placeholder="Other billing address" />
        </form>
        </section>
    )
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
        (item: { nr: string; navn: string }) => item.nr === value,
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
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={postalCode}
        onChange={handleChange}
        className="small-input"
        maxLength={4}
      />
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={city}
        readOnly
        className="small-input"
      />
    </div>
  )
}

export default ZipForm

