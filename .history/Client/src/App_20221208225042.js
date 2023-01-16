import './App.css';
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import SignUpForm from './Pages/SignUpForm';
import Header from './Pages/Header';
import PagenotFound from './Pages/PagenotFound';
import Loginpage from './Pages/Loginpage';
import About from './Pages/About'
import Contact from './Pages/Contact'
import AllProducts from './Pages/AllProducts';
import Footer from './Pages/Footer';
import OrderWithPrescription from './Pages/OrderWithPrescription';
import Cart from './Pages/Cart';
import NavigationBar from './Pages/NavigationBar';
import CheckoutPage from './Pages/CheckoutPage';
import ViewProductsPage from './Pages/ViewProductsPage';
import CustomerAccount from './Pages/CustomerAccount';
import NoPageFound from './Pages/NoPageFound';
import TermsAndCondition from './Pages/TermsAndCondition';
import { AuthProvider } from './Pages/ContextFiles/AuthContext';
import RestrictedRoutes from './Pages/ContextFiles/RestrictedRoute';
import PrivateRoutes from './Pages/ContextFiles/PrivateRoutes';
import TransactionSuccess from './Pages/TransactionSuccess';
import OrdersList from './Pages/OrdersList';
import OrderItemList from './Pages/OrderItemList';

function App() {
  return (
    <div>
      <AuthProvider>
        
        <NavigationBar/>
        <div className="content-wrap">
          <Router>
            <Routes>
              <Route path="/" element={<Header/>}></Route>
              <Route path="/Home" element={<Header/>}></Route>
              <Route path="/SignUp" element={<SignUpForm/>}></Route>
              <Route path="*"element={<NoPageFound/>}></Route>
              <Route path="/Contact"element={<Contact/>}></Route>
              <Route path="/About"element={<About/>}></Route>
              <Route path="/TermsAndCondition"element={<TermsAndCondition/>}></Route>
              <Route path="/Products" element = {<AllProducts/>}></Route>
              <Route path='/Products/:id' element = {<AllProducts/>}></Route>
              <Route path="/Prescription" element = {<OrderWithPrescription/>}></Route>
              <Route path='/view/product/:id' element = {<ViewProductsPage/>}></Route>
              <Route path="/Account" element = {<CustomerAccount/>}></Route>
              <Route path="/customer/account" element = {<CustomerAccount/>}></Route>

              <Route element={<PrivateRoutes/>} >
                <Route path="*" element={<NoPageFound />} />
                <Route path="/Cart" element = {<Cart/>}></Route>
                <Route path="/Checkout" element = {<CheckoutPage/>}></Route>
                <Route path="/customer/orders" element = {<OrdersList/>}></Route>
                <Route path="/customer/orders/:id" element = {<OrderItemList/>}></Route>
                <Route path="/transaction/success" element = {<TransactionSuccess/>}></Route>
              </Route>

              <Route element={<RestrictedRoutes/>} >
                <Route path="*" element={<NoPageFound />} />
                <Route path="/login" element={<Loginpage />} />
              </Route>

            </Routes>
          </Router>
        </div> 
      </AuthProvider>

      <Footer/>
    </div>
  );
}

export default App;
