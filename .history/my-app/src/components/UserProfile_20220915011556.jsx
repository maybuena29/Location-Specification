import { Axios } from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  
  function LogoutBTN(event){
    Axios.post(`http://localhost:3001/api/user/logout}`)
  }
  return (
    
      
    <div>UserProfile</div>
    <button onClick={LogoutBTN}/>
  )
}

export default UserProfile