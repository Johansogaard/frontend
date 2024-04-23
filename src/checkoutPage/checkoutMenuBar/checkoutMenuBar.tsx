import { Link } from 'react-router-dom'
import cofee from '../../assets/coffee.svg'
import navigateBack from '../../assets/navigate_before.svg'
import './checkoutMenuBar.css'
interface CheckoutMenuBarProps {
    step: number;
  }

export function CheckoutMenuBar({ step }: CheckoutMenuBarProps) {
    return (
        <header className="checkout-menubar-container">

        <div className='front'>
        <Link to="/cart" className="menubar-link">
        <img src={navigateBack} alt="back" />
        <span>back</span>
        </Link>
        </div> 
        <div className='middle'>
        <Link to="/" >
        <img src={cofee} alt="coffee" />
        </Link>
        </div>
        <div className='back'>
        <ProgressBar step={step} />
        </div>
        </header>
    )
}


const ProgressBar = ({step}: {step: number}) => {
    const stepOne = step===1 
    const stepTwo = step===2
    const stepThree = step===3
    return (
        <div className="progress-bar">
            <div className={'progress-bar-step' }>
            <span className={`progress-bar-step-numb ${stepTwo ? 'complete' : stepOne ? 'active' : ''}`}>
                1
            </span>
                <span className='progress-bar-step-text'>Info</span>
            </div>
            <div className={`horizontal-line ${stepTwo ? 'complete' : stepOne ? 'active' : ''}`} ></div>
            <div className={`progress-bar-step`}>
            <span className='progress-bar-step-numb '>2</span>
                <span className='progress-bar-step-text'>Payment</span>
            </div>
            <div className={`horizontal-line ${stepThree ? 'complete' : stepTwo ? 'active' : ''}`}></div>
            <div className={`progress-bar-step ${stepThree ? 'colplete' : ''}`}>
            <span className={`progress-bar-step-numb ${stepThree ? 'complete' : ''}`}>3</span>
                <span className='progress-bar-step-text'>Receipt</span>
            </div>
        </div>
    )
}

