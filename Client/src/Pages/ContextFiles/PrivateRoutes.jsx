import  { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from './AuthContext';

const PrivateRoutes = () => {
    const {isLoggedIn} = useContext(AuthContext)
    if(isLoggedIn)  return  <Outlet/>
      return <Navigate to={"/"}></Navigate>
};

export default PrivateRoutes;