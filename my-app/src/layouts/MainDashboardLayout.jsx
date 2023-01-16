
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar} from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { Outlet} from 'react-router-dom';
import '../App.css';

const MainDashboardLayout = (props) => {
    const { activeMenu } = useStateContext();
    return (
        <div id ="leftdiv"className='flex relative dark:bg-main-dark-bg'>
     
          {/* For SideBar */}
          {activeMenu ? (
            <div className='w-64 fixed sidebar text-white z-50 dark:bg-secondary-dark-bg'
                style={{background: '#28A9F1'}}>
             <Sidebar/> 
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar/>
            </div>
          )}

          {/* For Body */}
          <div className = {
            activeMenu
            ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-64 w-full'
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
          }>

            <div className='fixed md:static
              bg-white dark:bg-main-dark-bg
              navbar w-full z-40'>
                <Navbar/>
            </div>

            <div>
                <Outlet/>
            </div>

          </div>

              
          
        </div>
    );
};

export default MainDashboardLayout;