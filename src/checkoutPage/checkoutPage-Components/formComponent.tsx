import React, { useEffect, useState } from 'react'
import { formsManager } from '../checkoutPage-Hooks/formsManager'
import './formComponent.css'

export function FormComponent() {
  console.log('FormComponent rendered')
  const {
    email,
    phoneNumber,
    vatNumber,
    setEmail,
    setPhoneNumber,
    setVatNumber,
    isEmailValid,
    isPhoneNumberValid,
    isVatNumberValid,
  } = formsManager()
  return (
    <section className="form">
      <h2>Customer information</h2>
      <form className="form-content">
        <div className="checkout-UserInfo">
          
          <select id="userType" name="usertype" required>
            <option value="privat">User type: Private</option>
            <option value="comp">User type: Company</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ borderColor: isPhoneNumberValid ? 'green' : '#8B0000' }}
            required
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            maxLength={8}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="user-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="user-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderColor: !(email.length > 1 && isEmailValid)
                ? 'black'
                : 'black',
            }} // Visuel feedback med grænsefarve rød eller grøn når det er korrekt/forkert/
          />
          <select id="country" name="country" required>
            <option value="dk">Country: Denmark</option>
          </select>
          
          <input type="text" name="address" placeholder="Address" />
          <ZipForm />


                    <input
            type="text"
            name="companyName"
            placeholder="(Optional) Company Name"
            className='companyName-input'
          />    

            
          <input
          type="text"
          name="company"
          placeholder="(Optional) Company VAT number "
            className='vatNumber-input'
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          style={{
            borderColor:
              vatNumber.length > 2 && !isVatNumberValid
                ? '#8B0000'
                : vatNumber.length > 0 &&
                    vatNumber.length <= 2 &&
                    !/[a-zA-Z]/.test(vatNumber)
                  ? '#8B0000'
                  : vatNumber.length >= 3 && !/[0-9]/.test(vatNumber)
                    ? '#8B0000'
                    : isVatNumberValid
                      ? 'green'
                      : '',
          }}
          maxLength={10}
          required
          onKeyPress={(event) => {
            const currentValue = vatNumber + event.key

            //Lås for symboler.
            if (!/^[0-9a-zA-Z]*$/.test(currentValue)) {
              event.preventDefault()
            }
            if (currentValue.length <= 2 && !/[a-zA-Z]/.test(event.key)) {
              event.preventDefault()
            }
            if (currentValue.length > 2 && !/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
            if (currentValue.length < 2 && /[0-9]/.test(event.key)) {
              /* empty */
            }
          }}
          
        />
         <input
          type="text"
          name="Other billing address"
          placeholder="(Optional) Other billing address"
        /> 
          <ZipForm />
        </div>


       

        {vatNumber.length === 10 && !isVatNumberValid && (
          <p className="error-message">VAT-number has to be 10 digits.</p>
        )}

       
        {email.length > 1 &&
          isEmailValid &&
          email.includes('@') &&
          email.includes('.') && (
            <p style={{ color: 'green' }}>Email is valid.</p>
          )}
        {email.length > 1 &&
          (!isEmailValid || !email.includes('@') || !email.includes('.')) && (
            <p className="error-message">Email is invalid.</p>
          )}
        {!isPhoneNumberValid && (
          <p className="error-message">Phone number is invalid.</p>
        )}
       
       
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
    <div className="zipform-container">
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={postalCode}
        onChange={handleChange}
        className="postalCode-input"
        maxLength={4}
      />
      {message && <p className="error-message">{message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}

        className="city-input"
      />
    </div>
  )
}

export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).
