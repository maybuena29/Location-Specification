import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import med_icon from '../Images/corumed_med_logo.png';

const LoginRole = () => {

    const [credentials,setcredentials] = useState({
        username:"",
        password:""
    })
    const [currentUser,sercurrentUser] = useState('');

    Axios.defaults.withCredentials=true;
    
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/user/login").then((response)=>{
            if (response.data.loggedIn==true){
                sercurrentUser(response.data.user[0].username);
                alert("LoggedIn" + currentUser)
            }
            console.log(response);
        })
    },[])

    const changeHandler = e => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
     }

     const LoginBtn = e =>{
        Axios.post("http://localhost:3001/api/user/login",{
            username:credentials.username,
            password:credentials.password
        }).then((response)=>{
            if (response.data.message){
                alert(response.data.message);
                console.log(response.data.loggedIn);
                
            }
            else{
                console.log(response.data[0]);
                console.log(response.data.loggedIn);
            }
            
        })
        
     }





    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className="w-full p-6 m-auto  rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl ">
            <section className="hero container max-w-screen-lg mx-auto pb-10 flex">
                <img className="w-32 mx-auto" src={med_icon} alt="screenshot" />
            </section>
                
                
                    <div className="mb-2">
                        <label
                            htmlFor="Username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            name="username"
                            className="block w-full px-4 py-2 mt-2 ring ring-2 ring-blue-300 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2  ring ring-2 ring-blue-300 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={changeHandler}
                        />
                    </div>
            
                    <div className="mt-6">
                        <button
                        onClick={LoginBtn}
                         className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                            
                        </button>
                    </div>
                
            </div>
        </div>
    );
}
export default LoginRole;