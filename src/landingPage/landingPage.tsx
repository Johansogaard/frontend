import React from 'react'
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'

const LandingPage: React.FC = () => {
  return (
  <>
     <Topbar />
    <Menubar />
    <div>
      <h1>Landing Page</h1>
    </div>
    </>
  )
 
}

export default LandingPage
