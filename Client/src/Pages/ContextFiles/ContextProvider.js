import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import mainApi from './Api';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [checkoutItem, setCheckoutItem] = useState([]);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [cartItemCounter, setCartItemCounter] = useState([]);
    const abortController = new AbortController();

    const fetchCartCount = (userCode) => {
        Axios.get(`${mainApi}/api/customer/cart/get/item/${userCode}`, {signal: abortController.signal}).then((response)=>{
            setCartItemCounter(response.data);
        });
    }

    return(
        <StateContext.Provider
            value={{
                checkoutItem,
                setCheckoutItem,
                referenceNumber,
                setReferenceNumber,
                fetchCartCount,
                cartItemCounter,
                setCartItemCounter,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);