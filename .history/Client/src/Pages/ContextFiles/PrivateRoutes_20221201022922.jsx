import  { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
const PrivateRoutes = () => {
    const {isLoggedIn} = useContext(AuthContext)
    if(isLoggedIn) return <Outlet/>
         return <Navigate to={"/login"}></Navigate>     
};

export default PrivateRoutes;  