import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from 'axios';
import { io } from 'socket.io-client';
import mainApi from '../contexts/Api';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

const socketForCritical = io.connect(mainApi)
const socketForNearExpire = io.connect(mainApi)
const socketForExpired = io.connect(mainApi)
export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined)
    const [notificationData, setNotificationData] = useState([]);
    const [criticalLevelList, setCriticalLevelList] = useState([]);
    const [inventoryList, setInventoryList] = useState([]);
    const [nearToExpireProduct, setNearToExpireProduct] = useState([]);
    const [expiredProduct, setExpiredProduct] = useState([]);

    const abortController = new AbortController();
  
    const fetchCriticalLevelList = async () => {
      await Axios.get(`${mainApi}/api/critical/level/get/dashboard`, {signal: abortController.signal}).then((response)=>{
        setCriticalLevelList(response.data);
      });
    }
  
    const fetchInventory = async () => {
      await Axios.get(`${mainApi}/api/inventory/get/critical/product`, {signal: abortController.signal}).then((response)=>{
        setInventoryList(response.data);
      });
    }

    const fetchNearToExpireProduct = async () => {
      await Axios.get(`${mainApi}/api/inventory/get/near/to/expire`, {signal: abortController.signal}).then((response)=>{
        setNearToExpireProduct(response.data);
      });
    }

    const fetchExpiredProduct = async () => {
      await Axios.get(`${mainApi}/api/inventory/get/expired/product`, {signal: abortController.signal}).then((response)=>{
        setExpiredProduct(response.data);
      });
    }
    
    // useEffect(()=>{
    //     window.addEventListener('click', (event)=>{
    //         console.log(event.target)
    //         console.log('click si notif:' + isClicked.notification)
    //         console.log(event.target.id)
    //         if(event.target.id != "notificationModal" && isClicked.notification){
    //             console.log('pumasok sa closing');
    //             setIsClicked({...initialState});
    //         }
    //     })
    // },[])

    useEffect(()=>{
      checkStockLevel();
    },[criticalLevelList.length, inventoryList.length])

    useEffect(() => {
      checkNearToExpire();
      checkExpiredProduct();
    }, [expiredProduct.length, nearToExpireProduct.length])
  
    const checkNearToExpire = () => {
      Array.from(nearToExpireProduct).map((item) => {
        socketForNearExpire.emit('near_expire_notification', item);
      })
    }
  
    const checkExpiredProduct = () => {
      Array.from(expiredProduct).map((item) => {
        socketForExpired.emit('expire_notification', item);
      })
    }

    const checkStockLevel = async () => {
      let num1 = 0;
  
      inventoryList.forEach((item) => {
        let criticalStock = 0;
        let num = 0;
        
        for(let i = 0; i < criticalLevelList.length; i++){
          if(criticalLevelList[i].Category_Name === item.productCategory){
            num = 1;
            criticalStock = Math.floor(criticalLevelList[i].MaxStock * (criticalLevelList[i].CriticalPercentage/100));
          }
          if(num === 0){
            criticalStock = Math.floor(500 * (20/100))
          }
        }
  
        checkStock(item, criticalStock); 
      })
    }
  
    const checkStock = (item, criticalStock) => {
      if(criticalStock === 0){
        let num = 0;
        Array.from(criticalLevelList).some((criticalItem) => {
          if(criticalItem.Category_Name === item.productCategory){
            num = 1;
            criticalStock = Math.floor(criticalItem.MaxStock * (criticalItem.CriticalPercentage/100));
          }
          if(num === 0){
            criticalStock = Math.floor(500 * (20/100))
          }
        })
      }
      if(criticalStock !== 0){
        if(item.inventoryQuantity <= criticalStock){
          socketForCritical.emit('critical_notification', item);
        }
      }
    }

    useEffect(() => {
        fetchInventory();
        fetchCriticalLevelList();
        fetchNearToExpireProduct();
        fetchExpiredProduct();
        return () => {
            abortController.abort();
        }
    }, [])

    useEffect(() => {
      socketForCritical.on('receive_critical_notif', (item) => {
        console.log('item sa critical: ', item);
        const exist = notificationData.find(n=>n.inventoryID === item.inventoryID)
        console.log(exist);
        if(!exist){
          setNotificationData((prev)=>prev.concat([item]))
        }
      })
      socketForNearExpire.on('receive_near_expire_notif', (item) => {
        console.log('item sa near expire: ', item);
        const exist = notificationData.find(n=>n.inventoryID === item.inventoryID)
        console.log(exist);
        if(!exist){
          setNotificationData((prev)=>prev.concat([item]))
        }
      })
      socketForExpired.on('receive_expire_notification', (item) => {
        console.log('item sa expired: ', item);
        const exist = notificationData.find(n=>n.inventoryID === item.inventoryID)
        console.log(exist);
        if(!exist){
          setNotificationData((prev)=>prev.concat([item]))
        }
      })
    }, []);

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true});
    }

    return(
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                initialState,
                notificationData,
                setNotificationData,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);