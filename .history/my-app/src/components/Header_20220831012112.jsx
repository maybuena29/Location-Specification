import React from 'react'

const Header = ({title}) => {
  return (
    <div className='mb-10'>
      <div class="flex-auto border-t-2 w-12 border-red-500 rounded"></div>
      <p className='text-3xl font-semibold font-poppins tracking-wide text-gray-500'>
        {title}
      </p>
    </div>
  )
}

export default Header