import React from 'react'
import { Link } from 'react-router-dom' // Importér Link fra react-router-dom
import { Menubar } from '../menubar/menubar'
import { Topbar } from '../topbar/topBar'
import './landingPage.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const LandingPage: React.FC = () => {
  return (
    <div className="landingPageContainer">
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="This is the landing page" />
        </Helmet>
      </HelmetProvider>
      <Topbar />
      <Menubar />
      <div className="contentContainer">
        <h1>Welcome to Our Home Collection</h1>
        <p className="introduction">
          Step into a world where each plate, cup, and utensil is a testament to
          timeless design and exquisite functionality, crafted to enrich your
          dining experience. Step into a realm of sophisticated design and
          exceptional quality. Each piece is a testament to beauty and
          functionality, ready to transform your table into canvas of memorable
          moments.
        </p>
        <Link to="/all-products">
          <button className="browseproductButton">Browse Products</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
