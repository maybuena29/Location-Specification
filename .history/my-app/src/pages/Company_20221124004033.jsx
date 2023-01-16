import React, { useState, useEffect } from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import mainApi from '../contexts/Api';
import { Header } from '../components';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import moment from 'moment'
import Axios from 'axios';
import { Modal, Space, Table, notification, Input, Image, Spin,DatePicker,message,Select } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';


const { TextArea } = Input;
const { Option } = Select;


const Company = () => {
  const [modal, setModal] = useState({Title: '', Visible: false,});
  const [btnType, setBtnType] = useState('');
  //const [removeFAQ, setremoveFAQ] = useState('');
  const [FAQTable, setFAQTable] = useState('');
  const [EDorUPD,setEDorUPD] = useState("Edit");
  const abortController = new AbortController();


  const AddFAQModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add FAQs', Visible: true});
  };

  const UpdateFAQModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update FAQs', Visible: true});
  };

  const handleOk = () => {
    setModal({Visible: false});
    fetchCompany();
    fetchFAQ();
    setQAfaq({
      question:"",
      answer:"",
      status:"Select Status",
      faqID:""
    });
  };

   //For the column of the table
   interface DataType {
    key: React.Key;
    brand_name: string;
    status: string;
  }

  const faqTblGrid: ColumnsType<DataType> = [
    {
      title: 'FAQ ID',
      dataIndex: 'faqID',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Question',
      dataIndex: 'question',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      render: (text, record) => {
        return <p style={{color: record.status === 'active' ? 'green': 'red', textTransform: 'capitalize'}}>{text}</p>
      }

    },
    {
      key: 'faqID',
      dataIndex: 'faqID',
      title: 'Actions',
      align: 'center',
      width: '120px',
      render:(_,record) =>
        <Space align='end'>
          {/* For Update */}
          <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={()=> {
              showDataToModal(record.faqID);
          }}>
            <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={edit}/>
          </Button>

          {/* For Delete */}
          <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5' onClick={() => {
              removeFAQ(record.faqID);
          }}>
            <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={archive}/>
          </Button>
        </Space>
    },
  ];
  const removeFAQ = (faqID) => {
    if(window.confirm('Are you sure that you wanted to delete this FAQ?')){
      Axios.delete(`${mainApi}/api/faq/remove/${faqID}`);
      openNotificationWithIconDelete('warning');
      fetchFAQ();
    }
  }

   const handleSubmit = async() => {
    if(btnType === 'Add'){
      if(QAfaq.question.trim().length === 0){
        message.error('The Question is Empty!');
      }
      else if(QAfaq.answer.trim().length === 0){
        message.error('The Answer is Empty!');
      }
      else if(QAfaq.status === "Select Status"){
        message.error('Select a FAQ Status!');
      }
      else{
         Axios.post(`${mainApi}/api/faq/insert`, {
          question: QAfaq.question,
          answer:  QAfaq.answer,
          status : QAfaq.status
        }).then(() => {
          openNotificationWithIconInsert("success");
          console.log('Data updated successfully');
          handleOk();
        }).catch((err) => {
          openNotificationWithIconError("error");
          alert(err.response.data);
          handleOk();
          
        });
  
       
       
        
      }
    }else if(btnType === 'Update'){

      //code for update
       Axios.put(`${mainApi}/api/faq/update/${QAfaq.faqID}`, {
        question: QAfaq.question,
        answer:QAfaq.answer,
        status : QAfaq.status
        
      }).then(() => {
        console.log('Data updated successfully');
        openNotificationWithIconUpdate("success");
        handleOk();
      }).catch((err) => {
        alert(err.response.data);
        openNotificationWithIconError("error");
        handleOk();
      });

      
      
      
    }
  };
  const showDataToModal = (faqID) => {
    Axios.get(`${mainApi}/api/faq/get/${faqID}`).then((resp)=>{
        setQAfaq(resp.data);
        UpdateFAQModal();
      });
      fetchFAQ();
      
  }

  
console.log(FAQTable);
  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Updated Successfully.",
      duration: 2,
    });
  };
  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Inserted Successfully.",
      duration: 2,
    });
  };
  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Action Deleted Successfully.",
      duration: 2,
    });
  };
  const openNotificationWithIconError = (type) => {
    notification[type]({
      message: "ERROR!",
      description: "Something went Wrong.",
      duration: 2,
    });
  };

 

const [company, setCompany] = useState({
  companyName  : "",
  owner:"",
  date_established:"",
  contact:"",
  description:"",
  address:"",
  email:"",
})

const fetchCompany = async () => {
  const { data } = await Axios.get(`${mainApi}/api/company/get`, {signal: abortController.signal})
  //setCompany(data)
  setCompany({...data, date_established : `${moment(data.date_established)}`})
}
const fetchFAQ = async () => {
  const { data } = await Axios.get(`${mainApi}/api/faq/get`, {signal: abortController.signal})
  setFAQTable(data)
}

const onChangeCompany = e => {
  setCompany({...company, [e.target.name]: e.target.value, date_established: `${moment(company.date_established)}`})
}

const [QAfaq, setQAfaq] = useState({
  faqID:"",
  question:"",
  answer:"",
  status: "Select Status"
})

const onChangeFAQ = (e,action) => {
  setQAfaq({...QAfaq, [e.target.name]: e.target.value })
}




async function EditUpdateCompany(e){
  if (EDorUPD ==="Edit"){
    setEDorUPD("Update");
  }
  else{
      const request = await Axios.put(`${mainApi}/api/company/update`,{
          companyName:company.companyName,
          owner:company.owner,
          date_established:company.date_established,
          contact:company.contact,
          description:company.description,
          address:company.address,
          email:company.email
      }).then(()=>{
        openNotificationWithIconUpdate("success")
      }).catch(()=>{
        openNotificationWithIconError("error")
      })
    setEDorUPD("Edit");
  }
}






useEffect(() => {
  fetchCompany()
  fetchFAQ()
  return () => {  
    abortController.abort();
  }
}, []);



  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Company' />

      <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
              <p className='my-auto px-4 font-semibold'>Organization Profile</p>
          </div>


      <div style={{ borderColor: "#747C95" }} className=" w-full my-5 border-b-2 rounded"></div>


        <div className='m-20 my-auto bg-white rounded overflow-auto'>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Name:</p>
                <Input className='my-auto' value={company.companyName} name="companyName" placeholder="No Value" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Owner:</p>
                <Input className='my-auto' value={company.owner} name="owner" placeholder="No Value" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Date Established:</p>
                <DatePicker className='my-auto w-full' name="date_established" value={moment(company.date_established)||null} placeholder="No Value" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Contact Number:</p>
                <Input className='my-auto' value={company.contact} name="contact" placeholder="No Value" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

           

            <div className="my-5 flex textboxes w-full">
                <p className='font-display w-32'>Company Description:</p>
                <TextArea rows={4} value={company.description} placeholder="Enter Description" name="description"disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Address:</p>
                <Input className='my-auto' value={company.address} placeholder="No Value" name="address" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>

            <div className="my-5 flex textboxes w-full">
               <p className='my-auto font-display w-32'>Company Email:</p>
                <Input className='my-auto' value={company.email} placeholder="No Value" name="email" disabled={EDorUPD === "Edit"? true:false} onChange={onChangeCompany}/>
            </div>


        </div>
        <div className='flex flex-row justify-end mt-5'>
          
          <NavLink to={''}> 
            <Button action='' onClick={EditUpdateCompany}  type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-2 h-10 rounded inline-flex items-center my-1 w-auto md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>{EDorUPD}</p>
            </Button>
          </NavLink>
          
        </div>




          </div>
        

<div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

<div className='flex w-full h-12 mt-2'>
  <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Frequently Asked Questions (FAQs)</p>

   <div className='relative w-full'>
    <div className='absolute right-0 w-34'>
      
      <Button type='button' size='sm' onClick={AddFAQModal} style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
        <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
        <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add FAQs</p>
      </Button>

      <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
        footer={[
        <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4 rounded" type="primary" onClick={handleSubmit}>{btnType}</Button>,
        <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>
        ]}>
          <div className='flex flex-col gap-4'>
                    <div>
                      <Input className='rounded-sm' value={QAfaq.question || ''} name="question" placeholder="FAQ Question" onChange={onChangeFAQ}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={QAfaq.answer || ''} name ="answer" placeholder="FAQ Answer" onChange={onChangeFAQ}/>
                    </div>


                    <div>
                      
                      <Select className='w-full rounded-sm' placeholder="Select Status" name="status" value={QAfaq.status || "Select Status"} onChange={(selectedstatus) => 
                         {setQAfaq({...QAfaq, status: selectedstatus})} } >
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </div>
                  </div>


        </Modal>

    </div>
  </div> 
</div>  

<div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>


{/* For Table */}
<div className='m-2 my-auto bg-white rounded overflow-auto'>
<Table bordered className='mt-14' columns={faqTblGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25']}} dataSource={FAQTable} rowKey="faqID"></Table>
</div>

</div>
</div>
 
  )
}

export default Company