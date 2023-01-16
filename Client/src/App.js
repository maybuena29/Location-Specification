import './App.css';
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import Header from './Pages/Header';
import PagenotFound from './Pages/PagenotFound';
import Loginpage from './Pages/Loginpage';
import About from './Pages/About'
import Contact from './Pages/Contact'
import Footer from './Pages/Footer';
import NavigationBar from './Pages/NavigationBar';
import TeacherProfile from './Pages/TeacherProfile';
import NoPageFound from './Pages/NoPageFound';
import { AuthProvider } from './Pages/ContextFiles/AuthContext';
import RestrictedRoutes from './Pages/ContextFiles/RestrictedRoute';
import PrivateRoutes from './Pages/ContextFiles/PrivateRoutes';
import TransactionSuccess from './Pages/TransactionSuccess';
import TeachersList from './Pages/TeachersList';
import OrderItemList from './Pages/OrderItemList';

function App() {
  return (
    <div>
      <AuthProvider>
        
        <NavigationBar/>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<TeachersList/>}></Route>
              <Route path="/Home" element={<TeachersList/>}></Route>
              <Route path="*"element={<NoPageFound/>}></Route>

              <Route element={<PrivateRoutes/>} >
                <Route path="/Account" element = {<TeacherProfile/>}></Route>
                <Route path="*" element={<NoPageFound />} />
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
