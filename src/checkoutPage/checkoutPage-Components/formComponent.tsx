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
  isVatNumberValid,
  firstName,
  setFirstName,
  isFirstNameValid,
  lastName,
  setLastName,
  isLastNameValid,
  address,
  setAddress,
  isAddressValid,

}) {
  const [userType, setUserType] = useState('privat'); // Default to 'privat' (Private)

  const handleSubmit = (event) => {
    event.preventDefault();
  };

 return (
     <section className="form">
       <h2>Customer information</h2>
       <form className="form-content" onSubmit={handleSubmit}>
         <div className="checkout-UserInfo">
           {/* User Type */}
           <select
             id="userType"
             name="usertype"
             required
             value={userType}
             onChange={(e) => setUserType(e.target.value)}
           >
             <option value="privat">Private</option>
             <option value="comp">Company</option>
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
             style={{ borderColor: !isPhoneNumberValid ? '' : 'red' }}
             maxLength={8}
           />


           {userType === 'comp' && (
             <input
               type="text"
               name="vatNumber"
               placeholder="VAT number (optional)"
               value={vatNumber}
               onChange={(e) => setVatNumber(e.target.value)}
               style={{ borderColor: vatNumber && !isVatNumberValid ? '' : '' }}
               maxLength={10}
             />
           )}


           <ZipForm />


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

