import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Toolbar, Inject } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

const EmployeeAccount = () => {
  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Products'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto px-4 font-semibold'>Masterlist</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/addproduct'}>    
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
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

                <Modal title="View Product" visible={isModalVisible} onCancel={doneModal} centered width={1000} footer={null}>
                  <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

                    <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Product Name:</p>
                            <Input className='my-auto' placeholder="Enter Product Name" floatlabeltype="Auto" value={productName} />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='font-display w-32'>Product Description:</p>
                            <TextArea rows={4} placeholder="Enter Product Description" floatlabeltype="Auto" className='resize-none'  value={productDescription}  />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Attribute Name:</p>
                            <Input className='my-auto' placeholder="Choose Size" floatlabeltype="Auto" value={productAttribute} />
                        </div>
                        <div className="flex textboxes w-full">
                            <p className='my-auto font-display w-32'>Attribute Value:</p>
                            <Input className='my-auto' placeholder="Enter Product Unit" floatlabeltype="Auto" value={productAttrValue} />
                        </div>
                    </div>

                    <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                    
                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Price:</p>
                          <Input placeholder="Enter Price" type="number" floatlabeltype="Auto" value={productPrice}/>
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Category:</p>
                          <Input className='my-auto' placeholder="Enter Product Category" floatlabeltype="Auto" value={productCategory} />
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Brand:</p>
                          <Input className='my-auto' placeholder="Enter Product Brand" floatlabeltype="Auto" value={productBrand} />
                      </div>

                      <div className="flex textboxes w-full">
                         <p className='my-auto font-display w-32'>Product SKU:</p>
                            <Input className='my-auto' value={productSKU} placeholder="Enter Product SKU"/>
                </div>
                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Supplier:</p>
                          <Input className='my-auto' placeholder="Enter Product Supplier" floatlabeltype="Auto" value={productSupplier} />
                      </div>

                      <div className="flex textboxes w-full">
                          <p className='my-auto font-display w-32'>Requires Prescription: </p>
                          <Input type = "checkbox" floatlabeltype="Auto" value = "1" checked={updateCBRP === "✔" ? true : false}/>
                      </div>
                      
                    </div>
                  </div>       
                </Modal>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>

          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={productGrid} dataSource={prodList}></Table>
          </div>

        </div>
    </div>
  )
}

export default EmployeeAccount