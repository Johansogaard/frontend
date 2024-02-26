//import React from 'react';
import './topBar.css';
import instagram from '../assets/instagram.svg'
import youtube from '../assets/youtube.svg'
import tiktok from '../assets/tiktok.svg'


export function Topbar()
{
    return(
    <div className="topbar-container">
            <div className="social-icons">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener">
                    <img src={instagram} alt="Instagram logo" className="social-icon" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer noopener">
                    <img src={youtube} alt="Youtube logo" className="social-icon" />
                </a>
                <a href="https://www.tiktok.com/explore" target="_blank" rel="noreferrer noopener">
                    <img src={tiktok} alt="Tiktok logo" className="social-icon" />
                </a>
            </div>
            <span className="shipping-info">Free shipping on all orders over 129 USD</span>
        </div>
    );
} 
