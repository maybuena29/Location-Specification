import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Toolbar, Inject } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

const EmployeeAccount = () => {
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Employees'/>
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-xl shadow-md'>
        <GridComponent className='rounded' id='gridcomp' dataSource={employeesData} allowPaging allowSorting toolbar={['Search']} width="auto">
          <ColumnsDirective>
            {employeesGrid.map((item, index) => (
              <ColumnDirective key={index} {...item}/>
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar]}/>
        </GridComponent>
      </div>
    </div>
  )
}

export default EmployeeAccount