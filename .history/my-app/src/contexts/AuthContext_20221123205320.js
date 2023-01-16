
import {useState, createContext, useEffect} from 'react';
import axios from 'axios'
import { TrinityRingsSpinner } from 'react-epic-spinners'
import logo from '../Images/corumed_med_logo.png'
import mainApi from "../contexts/Api";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [isLoggedIn, setLoginStatus] = useState(false)
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const verify = async()=>{
        try{
        const {data} = await axios.post(
          `${mainApi}/api/user/auth/`,
          {},
          {
            withCredentials: true,
          }
          
        )
          setLoginStatus(true)
          setUser(data.result)
          console.log(data.result);
        } 
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
       
    }   
    useEffect(()=>{
        verify()
        
    }, [])
   
    return (
        <>
            <AuthContext.Provider value={{isLoggedIn, setLoginStatus, setUser, user}}>
            { !isLoading ? props.children: 
                <div className='flex flex-auto justify-center items-center w-full'>
                    <div className='mx-auto mt-32 text-center'>
                        <img className='md:w-1/5 mx-auto w-1/2' src={logo}/>
                        <TrinityRingsSpinner color="#FF3C52" size={100} animationDelay={0.1} className='mx-auto mb-5'></TrinityRingsSpinner>
                        <label className='font-poppins font-medium text-xl tracking-wide mx-auto'>Loading...</label>
                    </div>
                </div>
            }
            </AuthContext.Provider>
        </>
    );
};