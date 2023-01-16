import React,{useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
import { ordersData, contextMenuItems, ordersGrid, productGrid, brandGrid } from '../data/dummy';
import { Header } from '../components';
import { NavLink,Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select} from 'antd';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { BiArchiveIn, BiWindowClose } from 'react-icons/bi';

const { TextArea } = Input;
const { Option } = Select;

const EmployeeAccount = () => {
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Products'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto px-4 font-semibold'>Employees List</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/addproduct'}>    
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>
                

               

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14'></Table>
          </div>

        </div>
    </div>
  )
}

export default EmployeeAccount