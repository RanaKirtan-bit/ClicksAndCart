import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets/frontend_assets/assets'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const {setShowSearch, getCartCount} = useContext(ShopContext)
  const navigate = useNavigate()

  const handleSearchClick = () => {
    navigate('/collection')
    setShowSearch(true)
  }

  return (
    <div className='flex items-center justify-between py-5 px-2 font-medium bg-gradient-to-r from-white to-yellow-100 shadow-sm transition-all duration-300'>
      
      <img src={assets.logo} className='w-36 hover:scale-105 transition-transform duration-300 cursor-pointer'/>
      
      <ul className='hidden sm:flex gap-8 text-medium text-black-700'>
            <NavLink to='/' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>HOME</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink to='/collection' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>COLLECTION</p> 
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink to='/about' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>ABOUT</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink to='/contact' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>CONTACT</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <div className='relative group'>
          <img onClick={handleSearchClick} src={assets.search_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-12'/>
          <div className='absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse'></div>
        </div>

        <div className='relative' onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
          <Link to='/login'><img src={assets.profile_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition-all duration-300'/></Link>
          <div className={`absolute dropdown-menu right-0 sm:right-0 sm:left-auto left-[-120px] top-full pt-2 transition-all duration-300 transform z-50 ${
            isProfileOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
          }`}>
            <div className='flex flex-col gap-1 w-40 py-4 px-4 bg-white text-gray-600 rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm'>
              <p className='cursor-pointer hover:text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-1'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-1'>Orders</p>
              <p className='cursor-pointer hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-1'>Logout</p>
            </div>
          </div>
        </div>
        
        <Link to='/cart' className='relative group'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5 hover:scale-110 transition-all duration-300'/>
         <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce'></div>
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden'/>
      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
              <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3'>
                <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180 cursor-pointer'/>
                <p className='cursor-pointer'>Back</p>
              </div>
              <NavLink onClick={()=>setVisible(false)}  to='/' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>HOME</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/collection' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>COLLECTION</p> 
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/about' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>ABOUT</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/contact' className='group flex flex-col items-center gap-1 relative overflow-hidden'>
                  <p className='transition-all duration-300 group-hover:text-yellow-600 group-hover:-translate-y-0.5 font-semibold tracking-wide'>CONTACT</p>
                  <hr className='w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-500 transition-all duration-500 ease-out' />
            </NavLink>
          </div>
      </div>
    </div>
  )
}

export default Navbar
