import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import med_icon from '../Images/corumed_med_logo.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900){
        setActiveMenu(false);
    }
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-2 pb-2 text-white mt-2 mb-2 text-md bg-blue-600 text-white border-red-500 border-transparent border-l-4';
  const normalLink = 'flex items-center gap-5 pl-4 pt-2 pb-2 rounded text-md text-gray-200 dark:text-gray-200 m-2 dark:hover:text-black hover:bg-blue-600 hover:text-white';

  return (
    <div className="h-screen md:overflow-auto overflow-auto hover:overflow-scroll pb-10">
      
      {activeMenu && (<>
        <div className='flex justify-between items-center sticky'>

          <Link to="/dashboard" onClick={handleCloseSideBar} className = "items-center gap-3 ml-3 mt-4 flex text-xl font-bold tracking-tight dark:text-white text-gray-50">
            <img className='w-16' src={med_icon}/>
            <span className='font-bold'>CORUMED</span>
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
                  <div className='text-blue-200 mt-2 uppercase mx-3'>
                      <div className=="flex-auto border-t-2 w-auto border-blue-500 rounded" style={{borderColor: '#56C2FF'}}></div>
                  </div>
                  {item.links.map((Link) => (
                    <NavLink to={Link.path}
                            key={Link.name}
                            onClick={handleCloseSideBar}
                            className={({ isActive }) =>
                              isActive ? activeLink : normalLink
                            }>
                            <span className='text-x1'>
                            {Link.icon}
                          </span>
                       
                        <span className='capitalize text-sm'>
                          {Link.name}
                        </span>
                    </NavLink>
                  ))} 
              </div>
          ))}

        </div>

      </>)}
      
    </div>
  )
}

export default Sidebar