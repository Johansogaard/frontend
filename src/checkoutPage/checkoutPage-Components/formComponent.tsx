import React, { useEffect, useState, useContext } from 'react'
import { FormsContext } from '../../state/fromsState/formsContext'
import { PostalCodeData } from '../../state/fromsState/formsTypes'

import './formComponent.css'

export function FormComponent() {
  console.log('FormComponent rendered')
  const {state,dispatch } = useContext(FormsContext)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_EMAIL',payload:{email: e.target.value}})
  }
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_PHONE_NUMBER',payload:{phoneNumber: e.target.value}})
  }
  const handleVatNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_VAT_NUMBER',payload:{vatNumber: e.target.value}})
  }
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_FIRST_NAME',payload:{first_name: e.target.value}})
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_LAST_NAME',payload:{last_name: e.target.value}})
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_ADDRESS',payload:{address: e.target.value}})
  }
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type:'FORM_UPDATE_COUNTRY',payload:{country: event.target.value}})
  }
  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'FORM_UPDATE_BILLING_ADDRESS',payload:{billing_address: e.target.value}})
  }

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
            value={state.phoneNumber}
            onChange={handlePhoneNumberChange}
            style={{ borderColor: state.isPhoneNumberValid ? 'green' : 'red' }}
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
            value={state.first_name}
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="user-input"
            value={state.last_name}
            onChange={handleLastNameChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={state.email}
            onChange={handleEmailChange}
            style={{
              borderColor: !(state.email.length > 1 && state.isEmailValid)
                ? 'black'
                : 'black',
            }} // Visuel feedback med grænsefarve rød eller grøn når det er korrekt/forkert/
          />
          <select id="country" name="country" onChange={handleCountryChange} required>
            <option value="dk">Denmark</option>
          </select>
          <input type="text" name="address" placeholder="Address"  value={state.address}
            onChange={handleAddressChange}/>

        </div>

        <ZipForm />

        <input
          type="text"
          name="company"
          placeholder="Company VAT number (optional)"
          className="vat-input"

          value={state.vatNumber}
          onChange={handleVatNumberChange}
          style={{
            borderColor:
              state.vatNumber.length > 2 && !state.isVatNumberValid
                ? 'red'
                : state.vatNumber.length > 0 &&
                state.vatNumber.length <= 2 &&
                    !/[a-zA-Z]/.test(state.vatNumber)
                  ? 'red'
                  : state.vatNumber.length >= 3 && !/[0-9]/.test(state.vatNumber)
                    ? 'red'
                    : state.isVatNumberValid
                      ? 'green'
                      : '',
          }}
          maxLength={10}
          required
          onKeyPress={(event) => {
            const currentValue = state.vatNumber + event.key

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

        {state.vatNumber.length === 10 && !state.isVatNumberValid && (
          <p style={{ color: 'red' }}>VAT-number has to be 10 digits.</p>
        )}

        <input
          type="text"
          name="Other billing address"
          placeholder="Other billing address"
          className="billing-input"
          value={state.billing_address}
          onChange={handleBillingAddressChange}
        />
        {state.email.length > 1 &&
          state.isEmailValid &&
          state.email.includes('@') &&
          state.email.includes('.') && (
            <p style={{ color: 'green' }}>Email is valid.</p>
          )}
        {state.email.length > 1 &&
          (!state.isEmailValid || !state.email.includes('@') || !state.email.includes('.')) && (
            <p style={{ color: 'red' }}>Email is invalid.</p>
          )}
        {!state.isPhoneNumberValid && (
          <p style={{ color: 'red' }}>Phone number is invalid.</p>
        )}
       
       
      </form>
    </section>
  )
}

function ZipForm() {
  const { state, dispatch } = useContext(FormsContext)
 /* const [postalCode, setPostalCode] = useState('')
  const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([])
  const [message, setMessage] = useState('')
  const [city, setCity] = useState('')*/
  const handlePostalCodesChange = (data : PostalCodeData[]) => {
    dispatch({type:'ZIPFORM_UPDATE_POSTAL_CODES',payload: {postalCodes: data}})
  }
  const handlePostalCodeChange = (postalCode: string) => {
    dispatch({type:'ZIPFORM_UPDATE_POSTAL_CODE',payload: {postalCode: postalCode}})
  }
  const handleCityChange = (city: string) => {
    dispatch({type:'ZIPFORM_UPDATE_CITY',payload: {city: city}})
  }
  const handleMessageChange = (message: string) => {
    dispatch({type:'ZIPFORM_UPDATE_MESSAGE',payload: {message: message}})
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.dataforsyningen.dk/postnumre')
      const data = await response.json()
      handlePostalCodesChange(data)
    }
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    handlePostalCodeChange(value)

    if (value.length === 4) {
      const postalCodeData = state.postalCodes.find(
        (item: { nr: string; navn: string }) => item.nr === value,
      )
      if (postalCodeData) {
        handleMessageChange('')
        handleCityChange(postalCodeData.navn)
      } else {
        handleMessageChange('Postal code is not valid')
        handleCityChange('')
      }
    }
  }

  return (
    <div className="zipform-container">
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={state.postalCode}
        onChange={handleChange}
        className="postalCode-input"
        maxLength={4}
      />
      {state.message && <p style={{ color: 'red' }}>{state.message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={state.city}
        readOnly
        className="city-input"
      />
    </div>
  )
}

export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).
