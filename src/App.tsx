import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { Topbar } from './topbar/topBar'
import { Menubar } from './menubar/menubar'
import { ShoppingCart } from './shopping-cart/shoppingCart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <p>
      <Topbar />
    </p>
    <p>
      <Menubar />
      </p>
    <p>
      <ShoppingCart />
    </p>
    </>
  )
}

export default App


function MyButton() {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    // Correctly update the state
    setCount(currentCount => currentCount + 1);
  };

  return (
  <button onClick={handleClick}>
    Click me {count}</button>
  )
}