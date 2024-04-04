import Link from '../../components/Link'
import cofee from '../../assets/coffee.svg'
import navigateBack from '../../assets/navigate_before.svg'

export function CheckoutMenuBar() {
    return (
        <header className="Checkout-menubar-container">
        <Link to="/cart">
        <img src={navigateBack} alt="back" />
        <h2>back</h2>
        </Link>
        <Link to="/">
        <img src={cofee} alt="coffee" />
        <h1>Porcelain</h1>
        </Link>
        </header>
    )
}


const ProgressBar = ({step}: {step: number}) => {
    return (
        <div className="progress-bar">
            <div className={`progress-bar-step ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`progress-bar-step ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-bar-step ${step >= 3 ? 'active' : ''}`}></div>
        </div>
    )
}