import React, { useEffect, useContext } from 'react'
import { FormsContext } from '../../state/fromsState/formsContext'


import './formComponent.css'

export function FormComponent() {
  console.log('FormComponent rendered')
  const { state, dispatch } = useContext(FormsContext)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_EMAIL', payload: { email: e.target.value } })
  }
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_PHONE_NUMBER', payload: { phoneNumber: e.target.value } })
  }
  const handleVatNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_VAT_NUMBER', payload: { vatNumber: e.target.value } })
  }
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_FIRST_NAME', payload: { first_name: e.target.value } })
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_LAST_NAME', payload: { last_name: e.target.value } })
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_ADDRESS', payload: { address: e.target.value } })
  }
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'FORM_UPDATE_COUNTRY', payload: { country: event.target.value } })
  }
  const handleUserTypeChange = (event: string) => {
    dispatch({ type: 'FORM_UPDATE_USERTYPE', payload: { userType: event } })
  }
  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_BILLING_ADDRESS', payload: { billing_address: e.target.value } })
  }
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FORM_UPDATE_COMPANY_NAME', payload: { company_name: e.target.value } })
  }
  useEffect(() => {
    console.log('UserType:' + state.userType)
  }, [state.userType])

  return (
    <section className="form">
      <h2>Customer information</h2>
      <form className="form-content">
        <div className="checkout-UserInfo">

          <select id="userType" name="usertype" required value={state.userType} onChange={(e) => handleUserTypeChange(e.target.value)}>
            <option value="privat">User type: Private</option>
            <option value="comp">User type: Company</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleEmailChange}
            style={{ borderColor: !state.isEmailValid ? '' : '' }}
          />

          <input
            type="firstName"
            name="firstName"
            placeholder="First name"
            value={state.first_name}
            onChange={handleFirstNameChange}
            style={{ borderColor: !state.isFirstNameValid ? '' : '' }}
          />

          <input
            type="lastName"
            name="lastName"
            placeholder="Last name"
            value={state.last_name}
            onChange={handleLastNameChange}
            style={{ borderColor: !state.isLastNameValid ? '' : '' }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={state.phoneNumber}
            onChange={handlePhoneNumberChange}
            style={{ borderColor: !state.isPhoneNumberValid ? '' : '' }}
            maxLength={8}
          />

          {state.userType == 'comp' && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name (optional)"
                value={state.company_name}
                onChange={handleCompanyChange}
              />

              <input
                type="text"
                name="vatNumber"
                placeholder="VAT number (optional)"
                value={state.vatNumber}
                onChange={handleVatNumberChange}
                style={{ borderColor: state.vatNumber && !state.isVatNumberValid ? '' : '' }}
                maxLength={10}
              />
            </>
          )}


          {state.userType === 'comp' && (
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing Address (optional)"
              value={state.billing_address}
              onChange={handleBillingAddressChange}
            />
          )}

          <input
            type="address"
            name="address"
            placeholder="Address"
            value={state.address}
            onChange={handleAddressChange}
            style={{ borderColor: !state.isAddressValid ? '' : '' }}
          />

          <select id="country" name="country" onChange={handleCountryChange} required>
            <option value="dk">Denmark</option>
          </select>

        </div>
      </form>
    </section>
  );
}

function ZipForm() {
  type PostalCodeData = {
    nr: string;
    navn: string;
  };
  const { state, dispatch } = useContext(FormsContext)
  //const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.dataforsyningen.dk/postnumre');
      const data = await response.json();
      handlePostalCodesChange(data)
    };
    fetchData();
  }, []);


  const handlePostalCodesChange = (data: PostalCodeData[]) => {
    dispatch({ type: 'ZIPFORM_UPDATE_POSTAL_CODES', payload: { postalCodes: data } })
  }
  const handlePostalCodeChange = (postalCode: string) => {
    if (postalCode.length === 4) {
      const postalCodeData = state.postalCodes.find(
        (item: { nr: string; navn: string }) => item.nr === postalCode
      );
      if (postalCodeData) {
        dispatch({ type: 'ZIPFORM_UPDATE_POSTAL_CODE_SUCCESS', payload: { postalCode: postalCode, city: postalCodeData.navn } })
      } else {
        dispatch({ type: 'ZIPFORM_UPDATE_POSTAL_CODE_FAILURE', payload: {} })

      }
    } else {
      dispatch({ type: 'ZIPFORM_UPDATE_POSTAL_CODE_FAILURE', payload: {} })
    }
    dispatch({ type: 'ZIPFORM_UPDATE_POSTAL_CODE', payload: { postalCode: postalCode } })
  }
  const handleCityChange = (city: string) => {
    dispatch({ type: 'ZIPFORM_UPDATE_CITY', payload: { city: city } })
  }
  /*const handleMessageChange = (message: string) => {
    dispatch({type:'ZIPFORM_UPDATE_MESSAGE',payload: {message: message}})
  }*/
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

        handleCityChange(postalCodeData.navn)
      } else {

        handleCityChange('')
      }
    }
  };

  return (

    <div className="zipform-containerLarge">
      <form className="form-content">
        <div className="checkout-UserInfo">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={state.postalCode}
            onChange={handleChange}
            className="postalCode-input"
            maxLength={4}
          />


          <input
            type="text"
            name="City"
            placeholder="City (Autofilled)"
            value={state.city}
            readOnly
            className="city-input"
          />

        </div>
      </form>
    </div>

  );
}


export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).
