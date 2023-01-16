import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Axios from 'axios';

import { Dashboard, NoPageFound, Rooms, Status, Teacher } from "./pages";

import './App.css';
import LoginRole from './pages/LoginRole';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes  from './components/PrivateRoutes';
import MainDashboardLayout from './layouts/MainDashboardLayout';
import RestrictedRoutes from './components/RestrictedRoutes';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

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
            <Route path="/teachers" element={<Teacher />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/status" element={<Status />} />
            
            {/* For Accessing Route that does not exist */}
            <Route path="*" element={<NoPageFound />} />
            <Route path="/NotAuthorizedPage/" element={<NotAuthorizedPage />} />
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