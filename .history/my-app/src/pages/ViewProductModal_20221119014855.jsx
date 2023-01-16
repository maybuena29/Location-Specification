import React,{useState,useEffect,useRef} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink,useParams } from 'react-router-dom';
import impExcel from '../Images/import.png';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select, Modal } from 'antd';
import Axios from 'axios';
import Products from './Products';
import mainApi from '../contexts/Api';

const { TextArea } = Input;
const { Option } = Select;




const ViewProductModal = ({onClose}) => {

console.log("ViewProductModal");
  const modalRef = useRef(null);
  const [count, setCount] = useState(0);
  const [productName, setPName] = useState('');
  const [productDescription, setPDescription] = useState('');
  const [productSize, setPSize] = useState('');
  const [productUnit, setPUnit] = useState('');
  const [productDosage, setPDosage] = useState('');
  const [PQuantity, setPQuantity] = useState('');
  const [productPrice, setPPrice] = useState('');
  const [productCategory, setPCategory] = useState('');
  const [productBrand, setPBrand] = useState('');
  const [productSupplier, setPSupplier] = useState('');
  const [PStatus, setPStatus] = useState('');
  const [productType, setPType] = useState('');
  const [PSKU, setPSKU] = useState('');
  const [productReqPres, setPRequiredPres] = useState('');
  const [updateCBRP,setupdateCBRP]=useState('');
  
  const {id} = useParams();
  console.log("ID: "+id);
  
   useEffect(() => {
        Axios.get(`${mainApi}/api/products/get/${id}`).then((response)=>{
          setPName(response.data.productName);
          setPDescription(response.data.productDescription);
          setPSize(response.data.productSize);
          setPUnit(response.data.productUnit);
          setPDosage(response.data.productDosage);
          setPPrice(response.data.productPrice);
          setPBrand(response.data.productBrand);
          setPCategory(response.data.productCategory);
          setPSupplier(response.data.productSupplier);
          setPType(response.data.productType);
          setupdateCBRP(response.data.productReqPres);
   
    });
    
  }, [count+1]);
  
  

  return (
        <Modal title="View Product" innerRef={modalRef}
        centered footer={[
                    <Button
                      key="submit"
                      size="sm"
                      style={{ backgroundColor: "#14D89A" }}
                      className="w-20 mr-4"
                      type="primary"
                    >
                      Done
                    </Button>
                   
                  ]}
              >
    <div className='flex flex-col md:flex-row w-full min-w-screen justify-center items-center'>

            <div className="flex md:mr-10  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Name:</p>
                    <Input className='my-auto' placeholder="Enter Product Name" floatLabelType="Auto" disabled />
                </div>
                <div className="flex textboxes w-full">
                    <p className='font-display w-32'>Product Description:</p>
                    <TextArea rows={4} placeholder="Enter Product Description" floatLabelType="Auto" className='resize-none'disabled  />
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32 font-bold'>Product Attribute:</p>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Size:</p>
                    <Select className='w-full rounded-sm' defaultValue="Choose Size" placeholder="Choose Size" disabled  >
                      <Option value="Size1">Size1</Option>
                      <Option value="Size2">Size2</Option>
                      <Option value="Size3">Size3</Option>
                  </Select>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Unit:</p>
                    <Select className='w-full rounded-sm' defaultValue="Choose Unit" placeholder="Choose Unit" disabled >
                      <Option value="Unit1">Unit1</Option>
                      <Option value="Unit2">Unit2</Option>
                      <Option value="Unit3">Unit3</Option>
                  </Select>
                </div>
                <div className="flex textboxes w-full">
                    <p className='my-auto font-display w-32'>Product Dosage:</p>
                    <Select className='w-full rounded-sm' defaultValue="Choose Dosage" placeholder="Choose Dosage"disabled >
                      <Option value="Dosage1">Dosage1</Option>
                      <Option value="Dosage2">Dosage2</Option>
                      <Option value="Dosage3">Dosage3</Option>
                  </Select>
                </div>
               
            </div>

            <div className="flex  flex-col gap-4 justify-center w-full md:w-1/2 p-0 sm:w-full">
            
              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Price:</p>
                  <Input placeholder="Enter Price" type="number" floatLabelType="Auto" />
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Category:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Category" placeholder="Choose Category"disabled >
                      <Option value="Category1">Category1</Option>
                      <Option value="Category2">Category2</Option>
                      <Option value="Category3">Category2</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Brand:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Brand" placeholder="Choose Brand" disabled >
                      <Option value="Brand1">Brand1</Option>
                      <Option value="Brand2">Brand2</Option>
                      <Option value="Brand3">Brand3</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Type:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Type" placeholder="Choose Type"disabled >
                      <Option value="Type1">Type1</Option>
                      <Option value="Type2">Type2</Option>
                      <Option value="Type3">Type3</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Supplier:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Supplier" placeholder="Choose Supplier" disabled >
                      <Option value="Supplier1">Supplier1</Option>
                      <Option value="Supplier2">Supplier2</Option>
                      <Option value="Supplier3">Supplier3</Option>
                  </Select>
              </div>

              <div className="flex textboxes w-full">
                  <p className='my-auto font-display w-32'>Requires Prescription: </p>
                  <Input type = "checkbox" floatLabelType="Auto" value= "1"disabled  />
              </div>
              
            </div>
          </div>
        
          </Modal>
          
         
    
        
        
   

          
          

  
    
  )
}

export default ViewProductModal


