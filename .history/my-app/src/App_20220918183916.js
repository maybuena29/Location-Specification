import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Axios from 'axios';

import { Products, Attributes, Brand, Category, Inventory, Supplier, Orders, GenerateOrder, TransactionHistory, Payments, EmployeeAccount, CustomerAccount, Points, Reports, Audit, Company, Dashboard, AddProduct, AddCategory, AddAttributes, AddBrand } from "./pages";

import './App.css';
import AddInventory from './pages/AddInventory';
import LoginRole from './pages/LoginRole';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes  from './components/PrivateRoutes';
import MainDashboardLayout from './layouts/MainDashboardLayout';
import RestrictedRoutes from './components/RestrictedRoutes';

const App = () => {
  
  Axios.defaults.withCredentials=true;  
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        
              <Routes>
                {/* Dashboard */}
                <Route element={<MainDashboardLayout/>}>
                <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/" element={<Dashboard/>} />
                {/* Pages */}
                <Route path="/products" element={<Products />} />
                <Route path="/attributes" element={<Attributes/>} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/category" element={<Category />} />
                <Route path="/inventory" element={<Inventory /> } />
                <Route path="/supplier" element={<Supplier /> } />
                <Route path="/orders" element={<Orders />} />
                <Route path="/generateorder" element={<GenerateOrder />} />
                <Route path="/transaction" element={<TransactionHistory /> } />
                <Route path="/payments" element={<Payments />} />
                <Route path="/customeracc" element={<CustomerAccount />} />
                <Route path="/employeeacc" element={<EmployeeAccount />} />
                <Route path="/points" element={<Points /> } />
                <Route path="/reports" element={<Reports />} />
                <Route path="/audit" element={<Audit /> } />
                <Route path="/company" element={<Company />} />
                
                {/* Additional Pages */}
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/products/update/:id" element={<AddProduct/>} />
                <Route path="/addinventory" element={<AddInventory />} />
                <Route path="/inventory/update/:id" element={<AddInventory/>} />
                <Route path="/addattribute" element={<AddAttributes />} />
                <Route path="/addattribute/:attrid" element={<AddAttributes />} />
                <Route path="/addbrand" element={<AddBrand />} />
                <Route path="/addcategory" element={<AddCategory />} />
              </Route>
              </Route>
                
                <Route element={<RestrictedRoutes/>} >
                    <Route path="/login" element={<LoginRole />} />
                </Route>
              </Routes>
             
      </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App