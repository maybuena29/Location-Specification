import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaRegUser, FaUserAlt } from 'react-icons/fa'
import mainLogo from '../Images/app_name_logo.png'
import mainIcon from '../Images/locator_icon.png'
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
    // 
    return (
        <div className="w-full h-full bg-no-repeat bg-cover" style={{backgroundImage: "url('https://i.ibb.co/FqfPV2F/main-background.png')"}}>
            <div className="flex justify-center min-h-screen p-2 overflow-hidden sm:p-2 md:p-0">
                <div className="flex flex-col w-full m-auto shadow-xl md:flex-row md:w-1/3 sm:w-full rounded-xl shadow-rose-600/40" style={{backgroundColor: 'white'}}>
                    <div className='flex flex-col items-center justify-center w-full p-2 md:w-full sm:w-full'>
                        <div className='flex flex-col invisible w-0 md:w-1/2 md:visible sm:invisible'>
                            <img className='w-0 h-0 my-auto md:w-auto md:h-auto' src={mainLogo}/>
                        </div>
                        <div className='flex flex-col items-center justify-center visible w-full my-5 md:w-0 md:invisible sm:visible'>
                            <img className='w-1/3 mx-auto h-1/3' src={mainIcon}/>
                        </div>
                        <form onSubmit={login} className="w-full px-10">
                            <div className="md:mt-0">
                                <Input
                                    name="username" suffix={<FaRegUser className='w-auto text-xl opacity-75'/>}
                                    className="w-full px-4 py-2 mt-2 bg-white border rounded-t-2xl rounded-r-2xl focus:outline-none"
                                    onChange={changeHandler} placeholder='Username'
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="password"
                                    name="password" suffix={<MdOutlineLock className='w-auto text-xl opacity-75'/>}
                                    className="w-full px-4 py-2 mt-2 bg-white border rounded-b-2xl rounded-r-2xl focus:outline-none"
                                    onChange={changeHandler} placeholder='Password'
                                />
                            </div>
                    
                            <div className="mt-4">
                                <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-2xl hover:bg-blue-600 focus:outline-none" style={{backgroundColor: '#006289'}}>
                                    Login
                                </button>
                            </div>
                            <div className='flex flex-col items-center justify-center p-2 mt-2 mb-10'>
                                <div className="flex-auto w-12 border-t-2 rounded" style={{color: "black", backgroundColor: "black"}}></div>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
        
    );
}

export default LoginRole;