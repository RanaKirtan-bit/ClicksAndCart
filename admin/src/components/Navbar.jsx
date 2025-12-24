import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken, setSidebarOpen, sidebarOpen}) => {
  return (
    <div className='flex items-center py-3 px-4 sm:py-4 sm:px-6 justify-between bg-white shadow-sm border-b'>
      <div className='flex items-center gap-3'>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
        >
          <div className='w-6 h-6 flex flex-col justify-center items-center'>
            <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </div>
        </button>
        <img src={assets.logo} alt="" className='w-24 sm:w-36 hover:scale-105 transition-transform duration-300 cursor-pointer'/>
        <div className='hidden sm:block'>
          <h1 className='text-lg sm:text-xl font-bold text-gray-800'>Admin Panel</h1>
          <p className='text-xs sm:text-sm text-gray-500'>Manage your e-commerce store</p>
        </div>
      </div>
      <button 
        onClick={()=>setToken('')} 
        className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 sm:px-6 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar