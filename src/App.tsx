import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './landingPage/landingPage';
import { AllProductsPage } from './productsPage/AllProductsPage';
import { DinnerwarePage } from './productsPage/DinnerwarePage';
import { DrinkwarePage } from './productsPage/DrinkwarePage';
import { ServewarePage } from './productsPage/ServewarePage';
import { AccessoriesPage } from './productsPage/AccessoriesPage';
import { ShoppingCart } from './shopping-cart/shoppingCartPage';
import { CheckoutPage } from './checkoutPage/checkoutPage';
import CancelPage from './checkoutPage/cancelPage';
import SuccessPage from './checkoutPage/successPage';
import { CartProvider } from './shopping-cart/shoppingCart-Context/cartContext';
import { ProductProvider } from './productsPage/productsPage-Context/productsContext';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <ProductProvider> {}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/dinnerware" element={<DinnerwarePage />} />
            <Route path="/drinkware" element={<DrinkwarePage />} />
            <Route path="/serveware" element={<ServewarePage />} />
            <Route path="/table-accessories" element={<AccessoriesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </ProductProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
