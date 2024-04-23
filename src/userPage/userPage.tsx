import { useContext, useState } from 'react'
import { UserContext } from '../state/userState/userContext'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import './userPage.css'

export function UserPage() {
  const { state, dispatch, login, register } = useContext(UserContext)
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [customer_password, setPassword] = useState('')
  const [customer_name, setName] = useState('')
  const [phone_number, setPhonenumber] = useState('')

<<<<<<< HEAD
  async function handleLogin(e: React.FormEvent) {
    //stops the page from refreshing like a submit button would do normally in a form
    //so we can handle it asynchronusly
    e.preventDefault()
    login({ email, customer_password })
  }
  function handleLogout() {
    dispatch({ type: 'LOGOUT' })
  }
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    register({ email, customer_password, customer_name, phone_number })
  }
  return (
=======

    async function handleLogin(e: React.FormEvent) {
        //stops the page from refreshing like a submit button would do normally in a form
        //so we can handle it asynchronusly
        e.preventDefault();
        login({ email, customer_password });

        
    }
    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
    }
    async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
        register({ email, customer_password, customer_name, phone_number });
    
    
    }

return (
>>>>>>> development
    <>
      <Topbar />
      <Menubar />
      <div className="user-container">
        {state.isAuthenticated ? (
          <div className="LoggedIn">
            <h1>Logged in</h1>
            <span>Hello {state.customer_name}</span>

            <button onClick={handleLogout}>Logout</button>
<<<<<<< HEAD
          </div>
        ) : signup ? (
          <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
              <label htmlFor="Name">Name</label>
              <input
                type="name"
                id="Name"
                name="Name"
                value={customer_name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="newEmail">Email</label>
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="newPassword">Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={customer_password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={phone_number}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              <button type="submit" className="signup-btn">
                Create Account
              </button>
            </form>
            <button className="goToLogin-btn" onClick={() => setSignup(false)}>
              go to login
            </button>
          </div>
        ) : (
          <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="Email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={customer_password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <button
              type="button"
              className="goToRegister-btn"
              onClick={() => setSignup(true)}
            >
              go to sign up
            </button>
          </div>
        )}
      </div>
=======
        </div>
    
    ) : signup ? (
    <div className='signup-container'>
                <form className='signup-form' onSubmit={handleSignup}>
                    <label htmlFor='Name'>Name</label>
                    <input type='name' id='Name' name='Name'value={customer_name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='newEmail'>Email</label>
                    <input type='email' id='newEmail' name='newEmail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor='newPassword'>Password</label>
                    <input type='password' id='newPassword' name='newPassword' value={customer_password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor='phonenumber'>Phone Number</label>
                    <input type='tel' id='phonenumber' name='phonenumber' value={phone_number} onChange={(e) => setPhonenumber(e.target.value)} />
                    <button type ='submit' className='signup-btn'>Create Account</button>
                </form>
                <button className='goToLogin-btn' onClick={() => setSignup(false)}>go to login</button>
                {state.message ==='Succesfully created account'? (
                    <p className='success'>{state.message}</p>
                ) : state.message?.includes('Registration failed')?
                (
                     <p className='failure'>{state.message}</p> 
                ): null}
                
            </div>

    )
    : (
       <div className='login-container'>
        <form className='login-form' onSubmit={handleLogin}>
            <label htmlFor='Email'>Email</label>
            <input type='text' id='Email' name='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={customer_password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='login-btn'>Login</button>  
            
        </form>
        <button type='button' className='goToRegister-btn' onClick={() => setSignup(true)}>go to sign up</button>
        {state.message?.includes('LOGIN_FAIL') ? 
        (
        <p className='failure'>{state.message}</p>
        
         ): null}
        </div>
    )}
    </div>

>>>>>>> development
    </>
  )
}
