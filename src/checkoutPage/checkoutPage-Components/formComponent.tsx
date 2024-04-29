import React, { useEffect, useState } from 'react'
import './formComponent.css'


interface FormComponentProps {
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  vatNumber: string;
  setVatNumber: (vatNumber: string) => void;
  isEmailValid: boolean;
  isPhoneNumberValid: boolean;
  isVatNumberValid: boolean;
  firstName: string;
  setFirstName: (firstName: string) => void;
  isFirstNameValid: boolean;
  lastName: string;
  setLastName: (lastName: string) => void;
  isLastNameValid: boolean;
  address: string;
  setAddress: (address: string) => void;
  isAddressValid: boolean;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  billingAddress: string;
  setBillingAddress: (billingAddress: string) => void;
}

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
  companyName,
  setCompanyName,
  billingAddress,
  setBillingAddress,
}: FormComponentProps) {
  const [userType, setUserType] = useState('privat');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <section className="form">
      <h2>Customer information</h2>
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="checkout-UserInfo">
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.dataforsyningen.dk/postnumre');
      const data = await response.json();
      setPostalCodes(data);
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPostalCodeLocal(value);

    if (value.length === 4) {
      const postalCodeData = postalCodes.find(
        (item: { nr: string; navn: string }) => item.nr === value
      );
      if (postalCodeData) {

        setCity(postalCodeData.navn);
        setIsValidPostalCode(true);
        setPostalCode(value);
        setPostalCodeValid(true);
      } else {

        setIsValidPostalCode(false);
        setCity('');
        setPostalCode('');
        setPostalCodeValid(false);
      }
    } else {

      setPostalCode('');
      setPostalCodeValid(false);
    }
  };

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


      <input
        type="text"
        name="City"
        placeholder="City, Automatic with Zip Code"
        value={city}
        readOnly
        className="city-input"
      />
    </div>
  );
}


export default ZipForm

//For making a checkbox with a label (So both text and checkbox has a certain size).

