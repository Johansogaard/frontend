import React, { useEffect, useContext } from 'react'
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
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: !isEmailValid ? '' : '' }}
          />

          <input
            type="firstName"
            name="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ borderColor: !isFirstNameValid ? '' : '' }}
          />

          <input
            type="lastName"
            name="lastName"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ borderColor: !isLastNameValid ? '' : '' }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ borderColor: !isPhoneNumberValid ? '' : '' }}
            maxLength={8}
          />

          {userType === 'comp' && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name (optional)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <input
                type="text"
                name="vatNumber"
                placeholder="VAT number (optional)"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                style={{ borderColor: vatNumber && !isVatNumberValid ? '' : '' }}
                maxLength={10}
              />
            </>
          )}


          {userType === 'comp' && (
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing Address (optional)"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          )}

          <input
            type="address"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ borderColor: !isAddressValid ? '' : '' }}
          />

          <select id="country" name="country" required>
            <option value="dk">Denmark</option>
          </select>
        </div>
      </form>
    </section>
  );
}
type ZipFormType = {
  setPostalCode: (postalCode: string) => void;
  setPostalCodeValid: (isValid: boolean) => void;
};
function ZipForm({ setPostalCode, setPostalCodeValid }: ZipFormType) {
  type PostalCodeData = {
    nr: string;
    navn: string;
  };

  const [postalCode, setPostalCodeLocal] = useState('');
  const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([]);

  const [city, setCity] = useState('');
  const [, setIsValidPostalCode] = useState(false);
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
  };

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
      {state.message && <p style={{ color: '#8B0000' }}>{state.message}</p>}

      <input
        type="text"
        name="City"
        placeholder="City"
        value={state.city}
        readOnly
        className="city-input"
      />
    </div>
  );
}


export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).
