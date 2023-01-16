import { Axios } from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  
  function handleDoneEvent(event){
    Axios.post(`http://localhost:3001/api/user/logout}`).then((response)=>{
      
      
     });
  }
  return (
    
      
    <div>UserProfile</div>
    <button>Logout</button>
  )
}

export default UserProfile