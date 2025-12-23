import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-white shadow-sm border-b'>
      <div className='flex items-center gap-3'>
        <img src={assets.logo} alt="" className='w-36 hover:scale-105 transition-transform duration-300 cursor-pointer'/>
        <div className='hidden sm:block'>
          <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
          <p className='text-sm text-gray-500'>Manage your e-commerce store</p>
        </div>
      </div>
      <button 
        onClick={()=>setToken('')} 
        className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar