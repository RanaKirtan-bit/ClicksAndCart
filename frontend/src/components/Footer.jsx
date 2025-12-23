import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-yellow-50 to-white border-t border-gray-200 mt-20'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          
          <div>
            <img 
              src={assets.logo} 
              alt="Click&Cart" 
              className='mb-4 w-32 hover:scale-105 transition-transform duration-300'
            />
            <p className='text-gray-600 leading-relaxed mb-4'>
              Your ultimate destination for premium fashion and lifestyle products. 
              Experience seamless shopping with quality and style.
            </p>
            
            <div className='flex gap-3'>
              {['Facebook', 'Twitter', 'Instagram'].map((social, index) => (
                <a 
                  key={social} 
                  href='#' 
                  className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors duration-300'
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4 text-gray-800'>
              COMPANY
            </h3>
            <ul className='space-y-2'>
              {['Home', 'About us', 'Collection', 'Delivery', 'Privacy policy'].map((item, index) => (
                <li key={index}>
                  <a 
                    href='#' 
                    className='text-gray-600 hover:text-yellow-600 hover:pl-2 transition-all duration-300'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4 text-gray-800'>
              GET IN TOUCH
            </h3>
            <div className='space-y-3'>
              <div className='text-gray-600'>
                <p className='font-medium text-gray-800 mb-1'>Phone:</p>
                <p>+91 99784-27943</p>
              </div>
              <div className='text-gray-600'>
                <p className='font-medium text-gray-800 mb-1'>Email:</p>
                <p>ranakirtan9@gmail.com</p>
              </div>
              
              <div className='mt-6'>
                <h4 className='font-semibold mb-2 text-gray-800'>Newsletter</h4>
                <div className='flex'>
                  <input 
                    type='email' 
                    placeholder='Your email'
                    className='flex-1 px-3 py-2 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:border-yellow-500 text-gray-800 placeholder-gray-400'
                  />
                  <button className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-r-lg transition-colors duration-300'>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-300 bg-gradient-to-r from-yellow-100 to-white'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-600 text-sm'>
              © 2026 <span className='text-yellow-600 font-semibold'>Click&Cart</span>. All Rights Reserved.
            </p>
            <div className='flex gap-4 text-sm'>
              <a href='#' className='text-gray-600 hover:text-yellow-600 transition-colors duration-300'>Terms</a>
              <a href='#' className='text-gray-600 hover:text-yellow-600 transition-colors duration-300'>Privacy</a>
              <a href='#' className='text-gray-600 hover:text-yellow-600 transition-colors duration-300'>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
