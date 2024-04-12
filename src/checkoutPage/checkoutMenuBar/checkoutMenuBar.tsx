import { Link } from 'react-router-dom'
import cofee from '../../assets/coffee.svg'
import navigateBack from '../../assets/navigate_before.svg'
import './checkoutMenuBar.css'

export function CheckoutMenuBar() {
    return (
        <header className="checkout-menubar-container">
        <Link to="/cart" className="menubar-link">
        <img src={navigateBack} alt="back" />
        <span>back</span>
        </Link>
        <Link to="/">
        <img src={cofee} alt="coffee" />
        </Link>

        <ProgressBar step={2} />
        </header>
    )
}


const ProgressBar = ({step}: {step: number}) => {
    return (
        <div className="progress-bar">
            <div className={'progress-bar-step' }>
            <span className={`progress-bar-step-numb ${step === 1 ? 'active' : ''}`}>
                1
            </span>
                <span className='progress-bar-step-text'>Info</span>
            </div>
            <div className="horizontal-line"></div>
            <div className={`progress-bar-step`}>
            <span className='progress-bar-step-numb '>2</span>
                <span className='progress-bar-step-text'>Delivery</span>
            </div>
            <div className="horizontal-line"></div>
            <div className={`progress-bar-step ${step >= 3 ? 'active' : ''}`}>
            <span className='progress-bar-step-numb'>3</span>
                <span className='progress-bar-step-text'>Payment</span>
            </div>
        </div>
    )
}

