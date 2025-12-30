import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Profile = () => {
  const { userData, token, navigate } = useContext(ShopContext)

  if (!token) {
    navigate('/login')
    return null
  }

  return (
    <div className='bg-linear-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-4xl mx-auto px-4'>
        
        <div className='text-center mb-16'>
          <div className='text-3xl md:text-4xl mb-4'>
            <h1 className='text-3xl font-bold text-gray-800'>MY PROFILE</h1>
          </div>
          <div className='w-24 h-1 bg-linear-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
          <div className='flex items-center gap-6 mb-8'>
            <div className='w-20 h-20 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center'>
              <span className='text-2xl font-bold text-white'>
                {userData?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>{userData?.name}</h2>
              <p className='text-gray-600'>{userData?.email}</p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-linear-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200'>
              <h3 className='text-lg font-semibold text-blue-800 mb-4'>Account Information</h3>
              <div className='space-y-3'>
                <div>
                  <p className='text-sm text-blue-600 font-medium'>Full Name</p>
                  <p className='text-gray-800'>{userData?.name}</p>
                </div>
                <div>
                  <p className='text-sm text-blue-600 font-medium'>Email Address</p>
                  <p className='text-gray-800'>{userData?.email}</p>
                </div>
              </div>
            </div>

            <div className='bg-linear-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200'>
              <h3 className='text-lg font-semibold text-green-800 mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <button 
                  onClick={() => navigate('/orders')}
                  className='w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200'
                >
                  View Orders
                </button>
                <button 
                  onClick={() => navigate('/cart')}
                  className='w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors duration-200'
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile