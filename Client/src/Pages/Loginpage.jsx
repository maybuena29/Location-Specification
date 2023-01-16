import React from 'react';
import mainLogo from '../images/app_name_logo.png'
import mainIcon from '../images/locator_icon.png'
import mainApi from './ContextFiles/Api';
import Axios from "axios";
import { useContext,useState } from 'react';
import { AuthContext } from './ContextFiles/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
    const {setLoginStatus, setUser}= useContext(AuthContext)
    const [credentials,setcredentials] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate();

    Axios.defaults.withCredentials=true;
    const changeHandler = e => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
     }

     const login = async(e)=>{
        e.preventDefault()
        try{
            const request = await Axios.post(`${mainApi}/api/teacher/account/login`,{
                teacher_username:credentials.username,
                teacher_password:credentials.password
            })
            setLoginStatus(true)
            setUser(request.data.result)
            // window.location.reload();
        }
        catch(error){
            alert(error.response.data.message);
        }
    }
    
  return (
    <div className='flex w-full h-screen px-10 md:px-0 lg:px-0'>
        <div className='rounded-bl-2xl rounded-tl-2xl rounded-r-2xl grid grid-cols-1 sm:grid-cols-2 m-auto h-[500px] shadow-lg shadow-gray-600 sm:max-w-[990px] w-full'>
            <div className='hidden w-full h-full bg-white sm:block'>
                <img className='w-full h-full bg-fixed rounded-bl-2xl rounded-tl-2xl' src={mainLogo} alt="/"/>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <form onSubmit={login} className='h-full w-full bg-[#73D6FF] pt-10 px-8 rounded-r-2xl'>
                    <h2 className='mt-2 text-lg font-bold text-left text-gray-900 font-Montserrat'>Sign In</h2>
                    <hr className="mt-2 text-black white-line"/>
                    <div className='flex flex-col py-2'>
                        <input className="rounded-r-xl rounded-tl-xl text-black bg-white mt-2 p-2.5 focus:border-blue-500 focus:bg-gray-800 focus:outline-none font-Montserrat" name="username" type="text" placeholder='Username' onChange={changeHandler}/>
                    </div>
                    <div className='flex flex-col py-2 '>
                        <input className='rounded-r-xl rounded-bl-xl  text-black bg-white mt-2 p-2.5 focus:border-blue-500 focus:bg-gray-800 focus:outline-none font-Montserrat' name="password"  type="password" placeholder='Password' onChange={changeHandler}/>
                    </div>
                    <div className='flex justify-between py-2 '>
                        <p className='flex items-center mr-3 font-Montserrat'>
                        <input className='mr-2' type="checkbox"/>Remember Me</p>
                    </div>
                    <button type='submit' className='mt-3 w-full py-2.5 bg-[#016189] shadow-lg text-white shadow-cyan-300/50 font-Montserrat rounded-3xl'>Sign In</button>
                    {/* <p className='flex items-center text-white font-Montserrat '>Don't have an Account? &nbsp; <a href="SignUp" className='font-bold text-red-400'> Create an Account</a></p> */}
                </form>
            </div>
        </div>
    </div>
  );
}

export default Loginpage;