import React, {useEffect,useState} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiMail, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification2Line, RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown, MdMessage, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Axios from 'axios';
import avatar from '../data/avatar.png';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';
import { useNavigate } from 'react-router-dom';


const NavButton = ({ title, customFunc, icon, color, dotColor}) => (

  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' 
            onClick={customFunc} 
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray">

              <span style={{background: dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
              {icon}

    </button>
  </TooltipComponent>

)
function LogoutBTN(event){
  Axios.post("http://localhost:3001/api/user/logout").then((response)=>{
    console.log(response);
    alert("Clicked");
  })
}
const Navbar = () => {

  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize } = useStateContext();

  const [currentUser,setcurrentUser] = useState('');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  
  }, [screenSize])
  
  Axios.defaults.withCredentials=true;
  const redirect = useNavigate();

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/user/login").then((response)=>{
      if (response.data.loggedIn==true){
        setcurrentUser(response.data.user[0].userUsername);
        
        console.log(currentUser);
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
        
        
    }
        else{
          redirect("/Login");
          window.location.reload();
        }
        console.log(response);
    })
},[])


  return (
    <div className='flex justify-between p-2 pl-4 pr-5 md:mx-0 shadow-lg'>
      
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="#515151" icon={<AiOutlineMenu />}/>

      <div className='flex'>

        <NavButton title="Cart" customFunc={() => handleClick('cart')} color="#515151" icon={<FiShoppingCart />}/>

        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color="#515151" icon={<FiMail />}/>

        <NavButton title="Notification" dotColor="#03C9D7" customFunc={() => handleClick('notification')} color="#515151" icon={<RiNotification3Line />}/>

        <TooltipComponent content="profile" position='BottomCenter'>
          {/* <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => handleClick('userProfile')}> */}
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={LogoutBTN}>
            <img src={avatar} alt="x" className='rounded-full w-8 h-8'/>
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>{currentUser}</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart/>}
        {isClicked.chat && <Chat/>}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}


      </div>

    </div>
  )
}

export default Navbar