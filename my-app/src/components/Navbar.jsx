import React, {useContext, useEffect,useState, useMemo} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiMail, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification2Line, RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown, MdMessage, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Axios from 'axios';
import avatar from '../Images/user_avatar.png';
import { Cart, Chat, Notification } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';
import { Link, Navigate, NavLink, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { io } from 'socket.io-client';
import mainApi from '../contexts/Api';
import { Badge } from 'antd';
import { GiSoundOn } from 'react-icons/gi';

const NavButton = ({ title, customFunc, icon, color, dotColor, count}) => (

  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc} style={{ color }} className="flex p-3 text-xl rounded-full hover:bg-light-gray">
      <Badge count={count} className='text-xl'>
        {icon}
      </Badge>
    </button>
  </TooltipComponent>

)

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
 
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {  
      window.removeEventListener('resize', handleResize)
      abortController.abort();
    }
  }, [])

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize])
  
  Axios.defaults.withCredentials=true;

  return (
    <div className='flex justify-between p-2 pl-4 pr-5 shadow-lg md:mx-0'>
      
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="#515151" icon={<AiOutlineMenu />}/>

      <div className='flex'>
        <TooltipComponent content="Logout?" position='BottomCenter'>
          <div className='flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray' onClick={LogoutBTN}>
            <img src={avatar} alt="x" className='w-8 h-8 rounded-full'/>
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='ml-1 font-bold text-gray-400 text-14'>{user.username}</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>
      </div>

    </div>
  )
}

export default Navbar