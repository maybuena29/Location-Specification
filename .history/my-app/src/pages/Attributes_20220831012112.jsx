import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const Attributes = () => {
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Attributes'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12'>
            <p className='my-auto w-96 sm:w-34 md:96 px-4 font-semibold'>Available Attributes</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

              <NavLink to={'/addattribute'}>    
                  <Button type='button' size='sm' style={{backgroundColor: '#62EAF3'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>
                <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-green-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 w-10 sm:w-10 md:w-auto md:p-4'>
                    <img className='w-6 h-6 mx-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={impExcel}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

              </div>
            </div>
          </div>  

          <GridComponent className='rounded mt-2' id='gridcomp' dataSource={{}} allowPaging allowSorting toolbar={['Search']} width="auto">
            <ColumnsDirective>
              {ordersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item}/>
              ))}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]}/>
          </GridComponent>
        </div>




    </div>
  )
}

export default Attributes