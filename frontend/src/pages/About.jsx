import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='bg-linear-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-7xl mx-auto px-4'>
        
        <div className='text-center mb-16'>
          <div className='text-3xl md:text-4xl mb-4'>
            <Title text1={'ABOUT'} text2={'US'}/>
          </div>
          <div className='w-24 h-1 bg-linear-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        <div className='mb-20'>
          <div className='bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100'>
            <div className='flex flex-col lg:flex-row gap-12 items-center'>
              <div className='lg:w-1/2'>
                <img 
                  src={assets.about_image_1} 
                  alt="About Us" 
                  className='w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='lg:w-1/2 space-y-6'>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  Welcome to Click&Cart, your premier destination for fashion and lifestyle products. 
                  We are passionate about bringing you the latest trends and timeless classics that 
                  define your unique style.
                </p>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  Founded with a vision to make quality fashion accessible to everyone, we curate 
                  collections that blend contemporary design with exceptional craftsmanship.
                </p>
                <div className='bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500'>
                  <h3 className='text-2xl font-bold text-gray-800 mb-3'>Our Mission</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    To empower individuals through fashion by providing high-quality, stylish, and 
                    affordable clothing that helps them express their personality and confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-20'>
          <div className='text-center mb-12'>
            <div className='text-2xl md:text-3xl mb-4'>
              <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>
            <div className='w-24 h-1 bg-linear-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>Quality Assurance</h3>
              <p className='text-gray-600 leading-relaxed text-center'>
                Every product undergoes rigorous quality checks to ensure you receive only the finest 
                materials and craftsmanship that meets our high standards.
              </p>
            </div>
            
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-linear-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>Convenience</h3>
              <p className='text-gray-600 leading-relaxed text-center'>
                Shop from the comfort of your home with our user-friendly platform, fast delivery, 
                and hassle-free returns for a seamless shopping experience.
              </p>
            </div>
            
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-linear-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>Customer Service</h3>
              <p className='text-gray-600 leading-relaxed text-center'>
                Our dedicated support team is always ready to assist you with personalized service, 
                expert advice, and prompt resolution of any concerns.
              </p>
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

export default About
