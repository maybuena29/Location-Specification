import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Products, Attributes, Brand, Category, Inventory, Supplier, Orders, GenerateOrder, TransactionHistory, Payments, EmployeeAccount, CustomerAccount, Points, Reports, Audit, Company, Area, Pie, Financial, Dashboard, AddProduct, Line, AddCategory, AddAttributes, AddBrand } from "./pages";

import { useStateContext } from './contexts/ContextProvider';
import './App.css';
import AddInventory from './pages/AddInventory';
import Login from './pages/Login';

const App = () => {
  const { activeMenu } = useStateContext();
  // const {location}=useLocation();
  // console.log(location.pathname);

  
  
  
  return (
    render() {
      if (window.location.pathname === '/Login') return null;
      return <Sidebar/> <Navbar/>;
    
    
    
    <div>
      
      <BrowserRouter>
      
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{zIndex: '1000'}}>
            <TooltipComponent content='Settings' position='TopCenter'>
              <button type='button' className='text-2xl p-3 hover:drop-shadow-x1 hover:bg-light-gray text-white'
                style={{background: '#28A9F1', borderRadius: '50%'}}>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          

          {/* For SideBar */}
          {activeMenu? (
            <div className='w-64 fixed sidebar text-white z-50 dark:bg-secondary-dark-bg'
                style={{background: '#28A9F1'}}>
              
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              
            </div>
          )}

          {/* For Body */}
          <div className = {
            activeMenu
            ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-64 w-full'
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
          }>

            <div className='fixed md:static
              bg-white dark:bg-main-dark-bg
              navbar w-full z-40'>
                
            </div>

            <div>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Pages */}
                <Route path="/products" element={<Products />} />
                <Route path="/attributes" element={<Attributes />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/category" element={<Category />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/generateorder" element={<GenerateOrder />} />
                <Route path="/transaction" element={<TransactionHistory />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/customeracc" element={<CustomerAccount />} />
                <Route path="/employeeacc" element={<EmployeeAccount />} />
                <Route path="/points" element={<Points />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/audit" element={<Audit />} />
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
                <Route path="/Login" element={<Login />} />

              </Routes>
            </div>

          </div>

              
          
        </div>
      </BrowserRouter>
    </div>
  } )
}

export default App