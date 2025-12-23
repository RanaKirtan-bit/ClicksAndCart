import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const {products, currency} = useContext(ShopContext);
  return (
    <div className='bg-gradient-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-6xl mx-auto px-4'>

        <div className='text-center mb-12'>
          <div className='text-3xl md:text-4xl mb-4'>
            <Title text1={'MY'} text2={'ORDERS'}/>
          </div>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        <div className='space-y-6'>
          {
            products.slice(1,4).map((item, index) => (
              <div key={index} className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
                  
                  <div className='flex items-start gap-6 flex-1'>
                    <div className='relative group'>
                      <img 
                        src={item.image[0]} 
                        alt="" 
                        className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>
                    
                    <div className='flex-1'>
                      <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-3 leading-tight'>{item.name}</h3>
                      <div className='flex flex-wrap items-center gap-3 mb-3'>
                        <p className='text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent'>
                          {currency}{item.price}
                        </p>
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                          Qty: 1
                        </span>
                        <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium'>
                          Size: M
                        </span>
                      </div>
                      <div className='flex items-center gap-2 text-gray-600'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <p className='text-sm'>Order Date: <span className='font-medium text-gray-800'>15 Jul, 2024</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-48'>
                    <div className='flex items-center gap-3 px-4 py-3 bg-green-50 rounded-xl border border-green-200'>
                      <div className='relative'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                        <div className='absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75'></div>
                      </div>
                      <p className='text-sm font-semibold text-green-700'>Ready to Ship</p>
                    </div>
                    
                    <button className='px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95'>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {products.slice(1,4).length === 0 && (
          <div className='text-center py-20'>
            <div className='bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto'>
              <div className='w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-12 h-12 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>No orders yet</h3>
              <p className='text-gray-600 mb-8'>Start shopping to see your orders here!</p>
              <button 
                onClick={() => window.location.href = '/collection'} 
                className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105'
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Orders
