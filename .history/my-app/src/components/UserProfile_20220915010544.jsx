import React from 'react'

const UserProfile = () => {
  
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