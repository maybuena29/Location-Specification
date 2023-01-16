import React from 'react';
import CorumedTransparent from '../images/CorumedTransparent.png';
import About from './About';
import './css/Contact.css';
import {BsTelephoneFill} from 'react-icons/bs'
const Contact = () => {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full shadow-2xl '>
        <div className='items-center w-[100%] mx-10 p-8 px-6 rounded-lg'>
            <div className='flex grow flex-col justify-center'>
                <h2>Ask a Question</h2>
                    <p className=''>Tell us what you think about our website, our products, or anything else that comes to mind. we welcome
                    all of your comments and suggestions, if you have any inquiries, please fill up the form
                    </p>
                <form className=''>
                    <div>
                        <input className='sm:max-w-[49%] w-[49%] rounded-lg mr-2 text-black bg-[#f8f4f4] mt-2 p-2 focus:border-gray-500  font-Montserrat' type="text" placeholder='Firstname*'/>
                        <input className='sm:max-w-[49%] w-[49%] rounded-lg  text-black bg-[#f8f4f4] mt-2 p-2 focus:border-gray-500    font-Montserrat' type="text" placeholder='Lastname*'/>
                    </div>
                    <div>
                        <input className='sm:max-w-[49%] w-[49%] rounded-lg mr-2  text-black bg-[#f8f4f4] mt-2 p-2 focus:border-gray-500   font-Montserrat' type="email" placeholder='Email Address*'/>
                        <input className='w-[49%] rounded-lg  text-black bg-[#f8f4f4] mt-2 p-2 focus:border-gray-500    font-Montserrat' type="number" placeholder='Contact Number*'/>
                    </div>
                    <div className=''>
                        <textarea rows={8} className='w-full max-h-full h-full mt-4 p-2 bg-[#f8f4f4] resize-none ' placeholder='Write a message here...' />
                        <button className=' bg-red-500 rounded-2xl items-center grow h-[30px] w-[20%] ml-60 text-white mt-10 '> Submit </button>
                    </div>
                </form>
            </div>
     </div>

        <div className='hidden sm:block ml-36'>
            <img className='h-[50%] w-auto text-gray-400' src={CorumedTransparent} />
            <p className=''>+639760254804</p>
            <p className=''>jicah04@gmail</p>
            <p className=''>www.corumed.ph</p>
            <p className=''>facebook.com.ph/CorumedPH</p>
        </div>
        
    </div>
  );


}

export default Contact
