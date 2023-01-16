import React, { useState } from 'react';
import med_icon from '../Images/corumed_med_logo.png';

const Login = () => {

    const [credentials,setcredentials] = useState({
        username:"",
        password:""
    })

    const changeHandler = e => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
     }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
            <div className="w-full p-6 m-auto  rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl ">
            <section className="hero container max-w-screen-lg mx-auto pb-10 flex">
                <img className="w-32 mx-auto" src={med_icon} alt="screenshot" />
            </section>
                
                <form className="mt-6">
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
                            onClick={()=>alert(credentials.username+" "+credentials.password)}
                         className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;