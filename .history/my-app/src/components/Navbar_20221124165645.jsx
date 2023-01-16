import React, {useContext, useEffect,useState, useMemo} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiMail, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification2Line, RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown, MdMessage, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Axios from 'axios';
import avatar from '../Images/user_avatar.png';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';
import { Link, Navigate, NavLink, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { io } from 'socket.io-client';
import mainApi from '../contexts/Api';
// import { notificationData } from '../data/dummy';
import { Badge } from 'antd';
import { GiSoundOn } from 'react-icons/gi';



const NavButton = ({ title, customFunc, icon, color, dotColor, count}) => (

  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc} style={{ color }} className="flex text-xl rounded-full p-3 hover:bg-light-gray">
      <Badge count={count} className='text-xl'>
        {icon}
      </Badge>
    </button>
  </TooltipComponent>

)

function LogoutBTN(event){
  Axios.post("http://localhost:3001/api/user/logout").then((response)=>{
    console.log(response);
    alert("Clicked");
  })
}
const socket = io(mainApi) 
const Navbar = () => {
  
  const { notificationData, setNotificationData } = useStateContext();
 
  function LogoutBTN(event){
    if(window.confirm('Are you sure that you wanted to logout?')){
      Axios.post("http://localhost:3001/api/user/logout")
        setLoginStatus(false);
    }
  }

  const {setLoginStatus, user}= useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [seconds, setSeconds] = useState(0);
  const { setActiveMenu, isClicked, handleClick, screenSize, setScreenSize } = useStateContext();
  const [inventoryList, setInventoryList] = useState([]);
  const [criticalLevelList, setCriticalLevelList] = useState([]);
  const [notifData, setNotifData] = useState([]);
  
  const abortController = new AbortController();
  
  // const fetchCriticalLevelList = async () => {
  //   await Axios.get(`${mainApi}/api/critical/level/get`, {signal: abortController.signal}).then((response)=>{
  //     setCriticalLevelList(response.data);
  //   });
  // }

  // const fetchInventory = async () => {
  //   await Axios.get(`${mainApi}/api/inventory/get`, {signal: abortController.signal}).then((response)=>{
  //     setInventoryList(response.data);
  //   });
  // }
  
  // useEffect(()=>{
  //   checkStockLevel()
  // },[criticalLevelList.length])

  // const checkStockLevel = async () => {
  //   let num1 = 0;

  //   inventoryList.forEach((item) => {
  //     let criticalStock = 0;
  //     let num = 0;
  //     console.log(criticalLevelList)
  //     for(let i = 0; i < criticalLevelList.length; i++){
  //       if(criticalLevelList[i].Category_Name === item.productCategory){
  //         num = 1;
  //         criticalStock = Math.floor(criticalLevelList[i].MaxStock * (criticalLevelList[i].CriticalPercentage/100));
  //       }
  //       if(num === 0){
  //         criticalStock = Math.floor(500 * (20/100))
  //       }
  //     }

  //     checkStock(item, criticalStock); 
  //   })
  // }

  // const checkStock = (item, criticalStock) => {
  //   if(criticalStock === 0){
  //     let num = 0;
  //     Array.from(criticalLevelList).some((criticalItem) => {
  //       if(criticalItem.Category_Name === item.productCategory){
  //         num = 1;
  //         criticalStock = Math.floor(criticalItem.MaxStock * (criticalItem.CriticalPercentage/100));
  //       }
  //       if(num === 0){
  //         criticalStock = Math.floor(500 * (20/100))
  //       }
  //     })
  //   }
  //   if(criticalStock !== 0){
  //     if(item.inventoryQuantity <= criticalStock){
  //       socket.emit('critical_level', item);
       
  //     }
  //   }
  // }
 
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    // fetchInventory();
    // fetchCriticalLevelList();
    return () => {  
      window.removeEventListener('resize', handleResize)
      abortController.abort();
    }
  }, [])
  
  // useEffect(() => {
  //   checkStockLevel();
  //   console.log("EMITTING")
  // }, []);

  // useEffect(() => {
  //   socket.on('notify_critical_level', (item) => {
  //     console.log('notif data', notificationData);
  //     // setNotificationData([item, ...notificationData]); 
      
  //     // console.log(item) 
  //     const exist = notificationData.find(n=>n.inventoryID === item.inventoryID)
  //     if(!exist){
  //       setNotificationData((prev)=>prev.concat([item]))
  //     }
  //   })
  // }, []);

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize])
  
  Axios.defaults.withCredentials=true;

  return (
    <div className='flex justify-between p-2 pl-4 pr-5 md:mx-0 shadow-lg'>
      
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="#515151" icon={<AiOutlineMenu />}/>

      <div className='flex'>
        <Link to={'/pos/generateorder'}>
          <NavButton title="POS" color="#515151" icon={<FiShoppingCart />}/>
        </Link>

        <NavButton title="Message" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color="#515151" icon={<FiMail />}/>

        <NavButton title="Notification" count={notificationData.length} customFunc={() => handleClick('notification')} color="#515151" icon={<RiNotification3Line />}/>

        <TooltipComponent content="profile" position='BottomCenter'>
          {/* <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => handleClick('userProfile')}> */}
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={LogoutBTN}>
            <img src={avatar} alt="x" className='rounded-full w-8 h-8'/>
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>{user.username}</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>

        {isClicked.chat && <Chat/>}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}


      </div>

    </div>
  )
}

export default Navbar