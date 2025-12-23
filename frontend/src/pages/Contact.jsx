import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='bg-gradient-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-7xl mx-auto px-4'>
        
        <div className='text-center mb-16'>
          <div className='text-3xl md:text-4xl mb-4'>
            <Title text1={'CONTACT'} text2={'US'}/>
          </div>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        <div className='mb-20'>
          <div className='bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100'>
            <div className='flex flex-col lg:flex-row gap-12 items-center'>
              <div className='lg:w-1/2'>
                <img 
                  src={assets.about_img} 
                  alt="Contact Us" 
                  className='w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500'
                />
              </div>
              
              <div className='lg:w-1/2 space-y-8'>
                <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
                      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                      </svg>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-800'>Our Store</h3>
                  </div>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    2618, M.K Gandhi Road Near Station,<br/>
                    Gandhinagar - 380775 Gujarat, India
                  </p>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                      <span className='text-gray-700 font-medium'>+91 99784-27943</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                      <span className='text-gray-700 font-medium'>ranakirtan9@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div className='bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
                      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                      </svg>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-800'>Careers at Click&Cart</h3>
                  </div>
                  <p className='text-gray-700 leading-relaxed mb-6'>
                    Join our dynamic team and be part of the fashion revolution. We're always looking 
                    for passionate individuals who share our vision.
                  </p>
                  <button className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95'>
                    Explore Jobs
                  </button>
                </div>

                <div className='bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200'>
                  <h3 className='text-xl font-bold text-gray-800 mb-4'>Quick Message</h3>
                  <div className='space-y-4'>
                    <input 
                      type='text' 
                      placeholder='Your Name' 
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200'
                    />
                    <input 
                      type='email' 
                      placeholder='Your Email' 
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200'
                    />
                    <textarea 
                      placeholder='Your Message' 
                      rows={4}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 resize-none'
                    ></textarea>
                    <button className='w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105'>
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-12'>
          <NewsletterBox />
        </div>
      </div>
    </div>
  )
}

export default Contact
