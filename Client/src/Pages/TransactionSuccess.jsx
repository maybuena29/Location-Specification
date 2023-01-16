import React, { useEffect }  from 'react'
import { Button, Result } from 'antd';
import check from '../images/check_pic.png'
import logo from '../images/corumed_med_logo.png'
import { BsCheck2Circle } from 'react-icons/bs';
import { TrinityRingsSpinner } from 'react-epic-spinners'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useStateContext } from './ContextFiles/ContextProvider';
import { useState } from 'react';

const TransactionSuccess = () => {

    const navigate = useNavigate
    const { checkoutItem, setCheckoutItem, referenceNumber, setReferenceNumber } = useStateContext();
    const [showSpinner, setShowSpinner ] = useState(true);

    setTimeout(() => setReferenceNumber(''), 24000);
    setTimeout(() => setShowSpinner(false), 4000);

    return (referenceNumber? (
            showSpinner?
                <div className='flex items-center justify-center flex-auto w-full h-full bg-white pb-32'>
                    <div className='mx-auto mt-32 text-center'>
                        <img className='w-1/2 mx-auto md:w-1/5' src={logo}/>
                        <TrinityRingsSpinner color="#FF3C52" size={100} animationDelay={0.1} className='mx-auto mb-5'></TrinityRingsSpinner>
                        <label className='mx-auto text-xl font-medium tracking-wide font-poppins pb-10'>Loading...</label>
                    </div>
                </div>
                :
                <div className='flex items-center justify-center p-10 bg-white'>
                    <Result
                        icon={<center><img src={check} className='object-center w-1/3 lg:h-1/5 lg:w-1/5 h-1/3'></img></center>}
                        title="Transaction Success!"
                        subTitle={
                            <div>
                                <p>We will notify you once your order is ready to claim.</p>
                                <p className='font-semibold'>Reference ID: {referenceNumber}</p>
                            </div>
                        }
                        extra={[
                            <NavLink to={'/'} key='buy'>
                                <Button type="primary">Buy Again</Button>,
                            </NavLink>,
                            <NavLink to={'/customer/orders'} key='orders'>
                                <Button key="console">View Orders</Button>,
                            </NavLink>
                        ]}
                    />
                </div>
            )
    :
            <Navigate to={"/"}></Navigate>
    )
}

export default TransactionSuccess