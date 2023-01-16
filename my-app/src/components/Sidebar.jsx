import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import mainLogo from '../Images/locator_icon.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { BiChevronDown } from 'react-icons/bi';
import { AuthContext } from '../contexts/AuthContext'
import Axios from "axios";
import mainApi from '../contexts/Api';

const Sidebar = () => {
  
  const { user }= useContext(AuthContext);
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [ subMenuOpen, setSubmenuOpen ] = useState(false);
  const [ currentMenu, setCurrentMenu ] = useState("");
  const [ userModuleList, setUserModulesList ] = useState([]);
  const abortController = new AbortController();

  const handleCloseSideBar = (e) => {
    if(activeMenu && screenSize <= 900){
        setActiveMenu(false);
    }
  }

  useEffect(() => {
    fetchUserModules();
    return () => {  
      abortController.abort();
    }
  }, [])

  const fetchUserModules = async () => {
    await Axios.get(`${mainApi}/api/user/get/modules/${user.userRoleID}`, {signal: abortController.signal}).then((response)=>{
      setUserModulesList(response.data);
    }).catch(err=>{
      console.log(err)
    });
  }

  const activeLink = 'flex items-center gap-5 pl-6 pt-2 pb-2 my-1 text-white text-md bg-blue-600 text-white border-red-500 border-transparent border-l-4 hover:text-white';
  const normalLink = 'flex items-center gap-5 pl-7 pt-2 pb-2 my-1 rounded text-md dark:text-gray-200 dark:hover:text-black hover:bg-blue-600 hover:text-white';
  const activeLinkSub = 'flex items-center gap-5 pl-6 pt-2 pb-2 my-1 ml-6 mr-2 text-white text-md bg-blue-600 text-white border-red-500 border-transparent border-l-4 hover:text-white';
  const normalLinkSub = 'flex items-center gap-5 pl-7 pt-2 pb-2 my-1 ml-6 mr-2 rounded text-md dark:text-gray-200 dark:hover:text-black hover:bg-blue-600 hover:text-white';

  return (
    <div className="h-screen pb-10 overflow-auto md:overflow-auto hover:overflow-scroll">
      
      {activeMenu && (<>
        <div className='sticky top-0 z-50 flex items-center justify-between bg-half-transparent' style={{backgroundColor: '#28A9F1'}}>

          <Link to="/dashboard" onClick={handleCloseSideBar} className = "z-50 flex items-center gap-3 mt-4 ml-3 text-xl font-bold tracking-tight dark:text-white text-gray-50 hover:text-white">
            <img alt='NOT AVAILABLE' className='w-16' src={mainLogo}/>
            <span className='font-bold hover:text-white'>Location Specification</span>
          </Link>
          
          <TooltipComponent content="Menu" position='BottomCenter'>
            <button type='button' 
                onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
                className = 'block p-3 mt-4 text-xl rounded-full hover:bg-light-blue md:hidden'>
              <MdOutlineCancel />
            </button>
          </TooltipComponent>

        </div>
        
        <div className='mt-5'>

          {links.map((item) => (
              <div key={item.title}>
                <div className="flex-auto w-auto mx-3 mt-4 mb-4 border-t-2 rounded" style={{borderColor: '#69DBFF'}}></div>
                  {item.links.map((Link) => (
                    <div key={Link.name}>
                      {Link.subMenu?
                        (user.userRoleID === 0? Link.forAdmin : false) || Link.forAdmin === null || Link.forAdmin === undefined?
                          <NavLink to={{}} key={Link.name}
                          onClick={() => {
                            setCurrentMenu(Link.name);
                            setSubmenuOpen(!subMenuOpen);
                          }} 
                          className={normalLink}>
                            <span className='text-2xl'>
                              {Link.icon}
                            </span>      
                            <span className='text-sm capitalize'>
                              {Link.name}
                            </span>
                            <div className='flex items-end justify-end flex-auto text-right'>
                              <BiChevronDown className={`${subMenuOpen && currentMenu === Link.name && "rotate-180"} transform text-2xl ml-10 mr-4`} />
                            </div>
                          </NavLink>
                          :
                          <></>
                        :
                          userModuleList.some((module) => module.moduleID === Link.module_id) || Link.forAll || (user.userRoleID === 0? Link.forAdmin : false)?
                          <NavLink to={Link.path} key={Link.name}
                                onClick={handleCloseSideBar}
                                className={({ isActive }) =>
                                  isActive ? activeLink : normalLink
                                }>
                            <span className='text-2xl'>
                              {Link.icon}
                            </span>      
                            <span className='text-sm capitalize'>
                              {Link.name}
                            </span>
                          </NavLink>
                          :
                          <></>
                      }
                      {Link.subMenu && subMenuOpen && currentMenu === Link.name && (
                        <div>
                          {Link.subMenuItems.map((subItems, index) => (
                            userModuleList.some((module) => module.moduleID === subItems.module_id) || (user.userRoleID === 0? Link.forAdmin : false)?
                              <NavLink to={subItems.path}
                                      key={index += 1}
                                      onClick={handleCloseSideBar}
                                      className={({ isActive }) =>
                                        isActive ? activeLinkSub : normalLinkSub
                                      }>
                                <span className='text-2xl'>
                                  {subItems.icon}
                                </span>      
                                <span className='text-sm capitalize'>
                                  {subItems.name}
                                </span>
                              </NavLink>
                              :
                              <></>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
              </div>
          ))}

        </div>

      </>)}
      
    </div>
  )
}

export default Sidebar