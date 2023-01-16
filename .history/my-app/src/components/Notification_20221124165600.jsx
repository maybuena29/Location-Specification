import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { RiErrorWarningLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import Tooltip from 'antd/es/tooltip';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
// import { notificationData } from '../data/dummy';

const Notification = () => {
  const { currentColor, notificationData } = useStateContext();

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white shadow-2xl dark:bg-[#42464D] py-4 px-8 rounded-lg w-96" id="notificationModal">
      <div className="flex justify-between items-center overflow-auto" id="notificationModal">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200" id="notificationModal">Notifications</p>
          <p className="text-black text-xs rounded p-1 px-2 bg-orange-300 italic" id="notificationModal">{notificationData.length} new</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%"/>
      </div>
      <div className={`overflow-scroll ${notificationData.length === 0? 'h-0' : (notificationData.length > 3? 'h-56' : 'h-auto')}`} id="notificationModal">
        {notificationData?.map((item, index) => {
          if(notificationData.length === 0){
            return(
              <p className="font-poppins font-medium italic text-center">No Notification</p>
            )
          }else{
            return(
              <TooltipComponent key={index} content="Add order now?" position='BottomCenter' id="notificationModal">
                <NavLink to={'/inventory/purchase_order/add_purchase_order'} id="notificationModal">
                  <div className="flex items-center leading-8 gap-5 border-b-1 border-color p-3" id="notificationModal">
                    {/* <img className="rounded-full h-10 w-10" src={item[index].image} alt={item[index].message} /> */}
                    <div className='w-auto h-full'>
                      <RiErrorWarningLine className={`rounded-full h-10 w-10 ${item.notifType === 'critical'? 'text-yellow-600': (item.notifType === 'expired'? 'text-red-600':'text-yellow-600')}`} id="notificationModal"/>
                    </div>
                    <div id="notificationModal">
                      <p className="font-semibold text-sm font-sans dark:text-gray-200" id="notificationModal">{item.notifType === 'critical'? 'Critical Item!': (item.notifType === 'expired'? 'Item Expired!':'Near To Expire!')}</p>
                      <p className="text-gray-500 text-sm dark:text-gray-400" id="notificationModal"> 
                        {item.notifType === 'critical'? 
                          item.productName + '(' + item.productAttribute + ':' + item.productAttrValue + ') is on critical level!'
                          : 
                          (item.notifType === 'expired'? 
                            item.productName + '(' + item.productAttribute + ':' + item.productAttrValue + ') has expired!'
                            :
                            item.productName + '(' + item.productAttribute + ':' + item.productAttrValue + ') is near to expire!')
                        }
                      </p>
                    </div>
                  </div>
                </NavLink>
              </TooltipComponent>
            )
          }
        })
        }
      </div>
    </div>
  );
};

export default Notification;