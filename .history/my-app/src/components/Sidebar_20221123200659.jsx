import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import med_icon from '../Images/corumed_med_logo.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { BiChevronDown } from 'react-icons/bi';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [ subMenuOpen, setSubmenuOpen ] = useState(false);
  const [ currentMenu, setCurrentMenu ] = useState("");

  const handleCloseSideBar = (e) => {
    if(activeMenu && screenSize <= 900){
        setActiveMenu(false);
    }
  }

  const activeLink = 'flex items-center gap-5 pl-6 pt-2 pb-2 my-1 text-white text-md bg-blue-600 text-white border-red-500 border-transparent border-l-4 hover:text-white';
  const normalLink = 'flex items-center gap-5 pl-7 pt-2 pb-2 my-1 rounded text-md dark:text-gray-200 dark:hover:text-black hover:bg-blue-600 hover:text-white';
  const activeLinkSub = 'flex items-center gap-5 pl-6 pt-2 pb-2 my-1 ml-6 mr-2 text-white text-md bg-blue-600 text-white border-red-500 border-transparent border-l-4 hover:text-white';
  const normalLinkSub = 'flex items-center gap-5 pl-7 pt-2 pb-2 my-1 ml-6 mr-2 rounded text-md dark:text-gray-200 dark:hover:text-black hover:bg-blue-600 hover:text-white';

  return (
    <div className="h-screen md:overflow-auto overflow-auto hover:overflow-scroll pb-10">
      
      {activeMenu && (<>
        <div className='flex justify-between items-center sticky top-0 z-50 bg-half-transparent' style={{backgroundColor: '#28A9F1'}}>

          <Link to="/dashboard" onClick={handleCloseSideBar} className = "z-50 items-center gap-3 ml-3 mt-4 flex text-xl font-bold tracking-tight dark:text-white text-gray-50 hover:text-white">
            <img alt='NOT AVAILABLE' className='w-16' src={med_icon}/>
            <span className='font-bold hover:text-white'>CORUMED</span>
          </Link>
          
          <TooltipComponent content="Menu" position='BottomCenter'>
            <button type='button' 
                onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
                className = 'text-xl rounded-full p-3 hover:bg-light-blue mt-4 block md:hidden'>
              <MdOutlineCancel />
            </button>
          </TooltipComponent>

        </div>
        
        <div className='mt-5'>

          {links.map((item) => (
              <div key={item.title}>
                <div className="flex-auto mt-4 mb-4 mx-3 border-t-2 w-auto rounded" style={{borderColor: '#69DBFF'}}></div>
                  {item.links.map((Link) => (
                    <div key={Link.name}>
                      {Link.subMenu?
                        <NavLink to={{}} key={Link.name} 
                        onClick={() => {
                          setCurrentMenu(Link.name);
                          setSubmenuOpen(!subMenuOpen);
                        }} 
                        className={normalLink}>
                          <span className='text-2xl'>
                            {Link.icon}
                          </span>      
                          <span className='capitalize text-sm'>
                            {Link.name}
                          </span>
                          <div className='flex flex-auto justify-end items-end text-right'>
                            <BiChevronDown className={`${subMenuOpen && currentMenu === Link.name && "rotate-180"} transform text-2xl ml-10 mr-4`} />
                          </div>
                        </NavLink>
                        :
                        <NavLink to={Link.path} key={Link.name}
                              onClick={handleCloseSideBar}
                              className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                              }>
                          <span className='text-2xl'>
                            {Link.icon}
                          </span>      
                          <span className='capitalize text-sm'>
                            {Link.name}
                          </span>
                        </NavLink>
                      }
                      {Link.subMenu && subMenuOpen && currentMenu === Link.name && (
                        <div>
                          {Link.subMenuItems.map((subItems) => (
                            <NavLink to={subItems.path}
                                    key={subItems.name}
                                    onClick={handleCloseSideBar}
                                    className={({ isActive }) =>
                                      isActive ? activeLinkSub : normalLinkSub
                                    }>
                              <span className='text-2xl'>
                                {subItems.icon}
                              </span>      
                              <span className='capitalize text-sm'>
                                {subItems.name}
                              </span>
                              
                            </NavLink>
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