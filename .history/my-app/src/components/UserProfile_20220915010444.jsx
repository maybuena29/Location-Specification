import React from 'react'

const UserProfile = () => {
  

  return (
    useEffect(()=>{
      Axios.get("http://localhost:3001/api/user/logout").then((response)=>{
       
            redirect("/Login");
            window.location.reload();
          
          console.log(response);
      },[])}
    <div>UserProfile</div>
  )
}

export default UserProfile