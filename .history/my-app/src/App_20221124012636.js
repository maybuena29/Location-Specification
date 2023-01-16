import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Axios from 'axios';

import { Products, Attributes, Brand, Category, Inventory, Supplier, Orders, GenerateOrder, TransactionHistory, Payments, EmployeeAccount, CustomerAccount, Points, Reports, Audit, Dashboard, AddProduct, AddAttributes, Roles, NoPageFound, Company, Discount, Tax, PurchaseOrder, GoodsReceipt, APInvoice, AddPurchaseOrder, ViewPurchaseOrder, AddGoodsReceipt, AddAPInvoice, ViewAPInvoice } from "./pages";

import './App.css';
import AddInventory from './pages/AddInventory';
import LoginRole from './pages/LoginRole';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes  from './components/PrivateRoutes';
import MainDashboardLayout from './layouts/MainDashboardLayout';
import RestrictedRoutes from './components/RestrictedRoutes';
import ViewGoodsReceipt from './pages/ViewGoodsReceipt';

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
                <Route path="/products/masterlist" element={<Products />} />
                <Route path="/products/attributes" element={<Attributes/>} />
                <Route path="/products/brand" element={<Brand />} />
                <Route path="/products/category" element={<Category />} />
                <Route path="/inventory/stocks" element={<Inventory /> } />
                <Route path="/inventory/purchase_order" element={<PurchaseOrder /> } />
                <Route path="/inventory/purchase_order/add_purchase_order" element={<AddPurchaseOrder /> } />
                <Route path="/inventory/goods_receipt" element={<GoodsReceipt /> } />
                <Route path="/inventory/goods_receipt/add_goods_receipt" element={<AddGoodsReceipt /> } />
                <Route path="/inventory/accounts_payable" element={<APInvoice /> } />
                <Route path="/inventory/accounts_payable/add_apinvoice" element={<AddAPInvoice /> } />
                <Route path="/supplier" element={<Supplier /> } />
                <Route path="/pos/orders" element={<Orders />} />
                <Route path="/pos/generateorder" element={<GenerateOrder />} />
                <Route path="/pos/transaction" element={<TransactionHistory /> } />
                <Route path="/pos/payments" element={<Payments />} />
                <Route path="/users/customeracc" element={<CustomerAccount />} />
                <Route path="/users/employeeacc" element={<EmployeeAccount />} />
                <Route path="/users/roles" element={<Roles />} />
                <Route path="/points" element={<Points /> } />
                <Route path="/adjustments/discount" element={<Discount /> } />
                <Route path="/adjustments/tax" element={<Tax /> } />
                <Route path="/reports" element={<Reports />} />
                <Route path="/audit" element={<Audit /> } />
                <Route path="/company" element={<Company /> } />
                
                {/* Additional Pages */}
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/products/update/:id" element={<AddProduct/>} />
                <Route path="/addinventory" element={<AddInventory />} />
                <Route path="/inventory/update/:id" element={<AddInventory/>} />
                <Route path="/inventory/purchase_order/add_purchase_order/:id" element={<AddPurchaseOrder/>} />
                <Route path="/inventory/purchase_order/view_purchase_order/:id" element={<ViewPurchaseOrder /> } />
                <Route path="/inventory/goods_receipt/view_goods_receipt/:id" element={<ViewGoodsReceipt /> } />
                <Route path="/inventory/accounts_payable/add_apinvoice/:id" element={<AddAPInvoice /> } />
                <Route path="/inventory/accounts_payable/view_apinvoice/:id" element={<ViewAPInvoice /> } />
                <Route path="/addattribute" element={<AddAttributes />} />
                <Route path="/addattribute/:attrid" element={<AddAttributes />
                <Route path="/users/roles/addroles" element={<Roles /> } /> } 
                />

                {/* For Accessing Route that does not exist */}
                <Route path="*" element={<NoPageFound />} />
              
              </Route>

              </Route>
                <Route element={<RestrictedRoutes/>} >
                    <Route path="*" element={<NoPageFound />} />
                    <Route path="/login" element={<LoginRole />} />
                </Route>
              </Routes>
             
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App