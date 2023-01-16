import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegUser, FaUserAlt } from 'react-icons/fa'
import mainLogo from '../Images/main_logo.png'
import medLogo from '../Images/corumed_med_logo.png'
import mainBG from '../Images/pharmacybg.png';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { Input } from 'antd';
import { MdLockOutline, MdOutlineLock } from 'react-icons/md';
import mainApi from "../contexts/Api";
// import { Input } from '@material-tailwind/react';


const LoginRole = () => {
    const {setLoginStatus, setUser}= useContext(AuthContext)
    const [credentials,setcredentials] = useState({
        username:"",
        password:""
    })
    Axios.defaults.withCredentials=true;
    const changeHandler = e => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
     }

     const login = async(e)=>{
        e.preventDefault()
        try{
            const request = await Axios.post(`${mainApi}/api/user/login`,{
                username:credentials.username,
                password:credentials.password
            })
            setLoginStatus(true)
            setUser(request.data.result)
            window.location.reload();
        }
        catch(error){
            alert(error.response.data.message);
        }
    }

    return (
        <div className="h-full w-full bg-no-repeat bg-cover" style={{backgroundImage: "url('https://i.ibb.co/SQNN4KQ/pharmacybg.png')"}}>
            <div className="flex justify-center min-h-screen overflow-hidden sm:p-2 md:p-0 p-2">
                <div className="flex md:flex-row flex-col md:w-1/2 w-full sm:w-full p-2 m-auto rounded-xl shadow-xl shadow-rose-600/40" style={{backgroundColor: '#56C2FF'}}>
                    
                    <div className='flex flex-col md:w-1/2 w-0 md:p-12 md:visible sm:invisible invisible'>
                        <img className='md:w-auto md:h-auto my-auto w-0 h-0' src={mainLogo}/>
                    </div>

                    <div className='flex flex-col md:w-0 w-full -mb-10 mt-2 justify-center items-center md:invisible sm:visible visible'>
                        <img className='w-1/3 h-1/3 mx-auto' src={medLogo}/>
                    </div>

                    <div className='flex flex-col md:p-2 md:visible sm:invisible invisible'>
                        <div style={{color: "#E9F7F8", backgroundColor: "#EFEFEF"}} className=" h-full my-5 rounded w-0.5 opacity-50"></div>
                    </div>

                    <div className='flex flex-col md:w-1/2 sm:w-full w-full md:p-10 p-2'>
                        <form onSubmit={login}>
                            <div className="mb-2 mt-2">
                                <div className="flex-auto border-t-2 w-12 border-red-500 rounded"></div>
                                <label htmlFor="Username" className="mt-1 block text-lg text-white font-poppins tracking-widest">
                                    Login as Admin User
                                </label>
                            </div>
                            <div className="mt-20">
                                <Input
                                    name="username" suffix={<FaRegUser className='opacity-75 text-xl w-auto'/>}
                                    className="w-full px-4 py-2 mt-2 bg-white border rounded-t-2xl rounded-r-2xl focus:outline-none"
                                    onChange={changeHandler} placeholder='Username'
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="password"
                                    name="password" suffix={<MdOutlineLock className='opacity-75 text-xl w-auto'/>}
                                    className="w-full px-4 py-2 mt-2 bg-white border rounded-b-2xl rounded-r-2xl focus:outline-none"
                                    onChange={changeHandler} placeholder='Password'
                                />
                            </div>
                    
                            <div className="mt-4">
                                <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-2xl hover:bg-blue-600 focus:outline-none" style={{backgroundColor: '#FF3C52'}}>
                                    Login
                                </button>
                            </div>
                            <div className='flex flex-col p-2 mt-2 justify-center items-center'>
                                <div className="flex-auto border-t-2 w-12 rounded opacity-50" style={{color: "#E9F7F8", backgroundColor: "#EFEFEF"}}></div>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
        
    );
}

export default LoginRole;