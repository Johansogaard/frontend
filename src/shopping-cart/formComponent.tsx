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
          

        <input type="text" name="company" placeholder="Company VAT number (optional)" value={vatNumber} onChange={handleVatNumberChange} 
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
        name="phone"  placeholder='Phone number' value={phoneNumber} onChange={handlePhoneNumberChange} 
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
