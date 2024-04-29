import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../state/userState/userContext'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import './userPage.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Order } from '../models/Orders'

export function UserPage() {
  const { state, dispatch, login, register } = useContext(UserContext)
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [customer_password, setPassword] = useState('')
  const [customer_name, setName] = useState('')
  const [phone_number, setPhonenumber] = useState('')


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
  useEffect(() => {
    console.log('Orders ' + state.orders)
  }, [state.orders])



  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="This is the user page" />
        </Helmet>
      </HelmetProvider>
      <Topbar />
      <Menubar />
      <div className="user-container">
        {state.isAuthenticated ? (
          <div className="LoggedIn">
            <h1>Logged in</h1>
            <p>Hello {state.customer_name}</p>

            <button className='logout_btn' onClick={handleLogout}>Logout</button>

            <h3>Orders:</h3>
            {state.loadingOrders ? (
              <p>Loading orders...</p>
            ) : state.orders === null || state.orders.length === 0 ? (
              <p>No orders</p>
            ) : (
              state.orders.map((order) => (
                <OrderItem key={order.order_id} order={order} />
              ))
            )}



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
            {state.message === 'Succesfully created account' ? (
              <p className="success">{state.message}</p>
            ) : state.message?.includes('Registration failed') ? (
              <p className="failure">{state.message}</p>
            ) : null}
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
            {state.message?.includes('LOGIN_FAIL') ? (
              <p className="failure">{state.message}</p>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}

function OrderItem({ order }: { order: Order }) {
  const convertDate = (date: string) => {
    return new Date(date).toDateString();
  }
  return (
    <div className="order-item-container">

      <p>Order Id #{order.order_id}</p>
      <p>Order total: {order.total_amount}</p>
      <p>Shipping Address: {order.shipping_address}</p>
      <p>Billing Address: {order.billing_address}</p>
      <p>Order date: {convertDate(order.order_date)}</p>

    </div>
  );
}