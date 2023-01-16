import React from 'react'
import { Result } from 'antd'

const NoPageFound = () => {
  return (
    <div className='flex justify-center items-center bg-white'>
      <Result
        style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
        className='h-full my-32'
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
      
  )
}

export default NoPageFound