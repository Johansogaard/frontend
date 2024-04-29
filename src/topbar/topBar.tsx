//import React from 'react';
import './topBar.css'
import instagram from '../assets/instagram.svg'
import youtube from '../assets/youtube.svg'
import tiktok from '../assets/tiktok.svg'
import { useEffect } from 'react'

export function Topbar() {

  useEffect(() => {
    document.body.classList.add('no-horizontal-scroll');
    
    return () => {
      document.body.classList.remove('no-horizontal-scroll');
    };
  }, []);

  return (
    <section className="topbar-container">
      <aside className="social-icons">
        <a
          href="https://www.instagram.com/mikkelschwarz/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={instagram} alt="Instagram logo" className="social-icon" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={youtube} alt="Youtube logo" className="social-icon" />
        </a>
        <a
          href="https://www.tiktok.com/explore"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={tiktok} alt="Tiktok logo" className="social-icon" />
        </a>
      </aside>
     
      <p className="shipping-info">Free shipping on all orders today!</p>
  
    </section>
  )
}
