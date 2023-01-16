import { Axios } from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const redirect = useNavigate();
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/user/logout").then((response)=>{
     
          redirect("/Login");
          window.location.reload();
        
        console.log(response);
    })})
  return (
    
      
    <div>UserProfile</div>
  )
}

export default UserProfile