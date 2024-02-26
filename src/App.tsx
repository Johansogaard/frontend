import './App.css'
import Route from './components/Route';
import Home from './landingPage/landingPage';
import { ShoppingCart } from "./shopping-cart/shoppingCart";
import {Topbar} from './topbar/topBar';
import {Menubar} from './menubar/menubar';

const App = () => {
  return (
    <>
      <Topbar />
      <Menubar />
      <Route path="/" component={() => <Home />} />
      <Route path="/cart" component={() => <ShoppingCart />} />
    </>
  );
};

export default App;