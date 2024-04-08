import React, { useEffect, useState } from 'react'
import { formsManager } from '../checkoutPage-Hooks/formsManager'
import './formComponent.css'


export function FormComponent() {
  console.log('FormComponent rendered')
    const {email,phoneNumber,vatNumber,setEmail,setPhoneNumber,setVatNumber,isEmailValid,isPhoneNumberValid,isVatNumberValid } = formsManager();
    return (
        <section className="form">
        <h2>Customer information</h2>
          <form className='form-content'>
            
          
            <div className='checkout-UserInfo'>

            <select id="userType" name="usertype" required>
              <option value="privat">Private</option>
              <option value="comp">Company</option>

            </select>

            <input type="tel"
                   name="phone" placeholder="Phone number" value={phoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}
                   style={{ borderColor: isPhoneNumberValid ? 'green' : 'red' }} required
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
              
              <input type="email" name="email" placeholder="Indtast din email" required value={email}
                   onChange={(e) => setEmail(e.target.value)}

                   style={{ borderColor:  !(email.length > 1 && isEmailValid) ? 'black' : 'black' }} // Visuel feedback med grænsefarve rød eller grøn når det er korrekt/forkert/
            />
             <select id="country" name="country" required>
              <option value="dk">Denmark</option>

            </select>
                   
            </div>
            <ZipForm />  

            <input
              type="text"
              name="company"
              placeholder="Company VAT number (optional)"
              value={vatNumber}
              onChange={(e) => setVatNumber(e.target.value)}
              style={{
                borderColor: (vatNumber.length > 2 && !isVatNumberValid) ? 'red' : (vatNumber.length > 0 && vatNumber.length <= 2 && !/[a-zA-Z]/.test(vatNumber)) ? 'red' : (vatNumber.length >= 3 && !/[0-9]/.test(vatNumber)) ? 'red' : isVatNumberValid ? 'green' : ''
              }}
              maxLength={10}
              required
              onKeyPress={(event) => {
                const currentValue = vatNumber + event.key;

                //Lås for symboler.
                if (!/^[0-9a-zA-Z]*$/.test(currentValue)) {
                  event.preventDefault();
                }
                if (currentValue.length <= 2 && !/[a-zA-Z]/.test(event.key)) {
                  event.preventDefault();
                }
                if (currentValue.length > 2 && !/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
                if (currentValue.length < 2 && /[0-9]/.test(event.key)) { /* empty */ }
              }}
            />

            {(vatNumber.length === 10 && !isVatNumberValid) && <p style={{ color: 'red' }}>VAT-nummeret skal være 10 cifre langt.</p>}
            <input type="text" name="address" placeholder="Address"
            />


            

            {email.length > 1 && isEmailValid && email.includes('@') && email.includes('.') && (
              <p style={{ color: 'green' }}>Emailen er gyldig.</p>
            )}
            {email.length > 1 && (!isEmailValid || !email.includes('@') || !email.includes('.')) && (
              <p style={{ color: 'red' }}>Emailen er ikke gyldig.</p>
            )}
            {!isPhoneNumberValid && <p style={{ color: 'red' }}>Telefonnummeret er forkert.</p>}
            <input type="text" name="Other billing address" placeholder="Other billing address" />
          </form>
          <Checkboxterms></Checkboxterms>
          <CheckboxNews></CheckboxNews>
          <Button disabled={undefined}></Button>
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
const Checkboxterms = (checker) => {
  return (
      <label className="checkbox">
        <input
            type="checkbox"
            name= {checker.name}
            checked={checker.val}
            onChange={() => {
              checker.setValue(!checker.val);
            }}
        />

        {checker.label}
        <h2 style={{ margin: '0', color: '#333' }}>Jeg bekræfter at mine oplysninger er korrekte og accepterer Handelsbetingelserne</h2>
      </label>
  );
};
const CheckboxNews = (checkNewsCon) => {
  return (
      <label className="checkbox">
        <input
            type="checkbox"
            name= {checkNewsCon.name}
            checked={checkNewsCon.val}
            onChange={() => {
              checkNewsCon.setValue(!checkNewsCon.val);
            }}
        />

        {checkNewsCon.label}
        <h2 style={{ margin: '0', color: '#333' }}>Jeg vil gerne modtage mulige fremtidige tilbud og emails fra Porcelain For Dads</h2>
      </label>
  );
};
const Button = ({ disabled }) => {
  return (
      <button disabled={disabled}>Submit order</button>
  );
};
export {default as Button} from './formComponent'
export {default as Checkboxterms} from './formComponent'
export {default as CheckboxNews} from './formComponent'