import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate, placeOrder, token} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!token) {
      navigate('/login')
      return
    }
    await placeOrder(formData)
  }

  return (
    <div className='bg-gradient-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-7xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-12'>
          
          <div className='flex-1'>
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
              <div className='mb-8'>
                <div className='text-2xl md:text-3xl mb-4'>
                  <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
                </div>
                <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full'></div>
              </div>
              
              <form onSubmit={onSubmitHandler} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input 
                    name='firstName'
                    onChange={onChangeHandler}
                    value={formData.firstName}
                    type="text" 
                    placeholder='First Name' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                  <input 
                    name='lastName'
                    onChange={onChangeHandler}
                    value={formData.lastName}
                    type="text" 
                    placeholder='Last Name' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                </div>
                
                <input 
                  name='email'
                  onChange={onChangeHandler}
                  value={formData.email}
                  type="email" 
                  placeholder='Email address' 
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                  required
                />
                
                <input 
                  name='street'
                  onChange={onChangeHandler}
                  value={formData.street}
                  type="text" 
                  placeholder='Street Address' 
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                  required
                />
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input 
                    name='city'
                    onChange={onChangeHandler}
                    value={formData.city}
                    type="text" 
                    placeholder='City' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                  <input 
                    name='state'
                    onChange={onChangeHandler}
                    value={formData.state}
                    type="text" 
                    placeholder='State' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input 
                    name='zipcode'
                    onChange={onChangeHandler}
                    value={formData.zipcode}
                    type="text" 
                    placeholder='Zip Code' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                  <input 
                    name='country'
                    onChange={onChangeHandler}
                    value={formData.country}
                    type="text" 
                    placeholder='Country' 
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                    required
                  />
                </div>
                
                <input 
                  name='phone'
                  onChange={onChangeHandler}
                  value={formData.phone}
                  type="tel" 
                  placeholder='Phone Number' 
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 placeholder-gray-500'
                  required
                />
                
                <button 
                  type='submit'
                  className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95'
                >
                  PLACE ORDER
                </button>
              </form>
            </div>
          </div>

          <div className='lg:w-[450px]'>
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8'>
              <CartTotal />
            </div>

            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
              <div className='mb-8'>
                <div className='text-2xl md:text-3xl mb-4'>
                  <Title text1={'PAYMENT'} text2={'METHOD'}/>
                </div>
                <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full'></div>
              </div>
              
              <div className='space-y-4 mb-8'>
                <div 
                  onClick={()=>setMethod('stripe')} 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    method === 'stripe' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === 'stripe' ? 'border-yellow-500' : 'border-gray-300'
                  }`}>
                    {method === 'stripe' && <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>}
                  </div>
                  <img src={assets.stripe_logo} alt="Stripe" className='h-6'/>
                  <span className='font-medium text-gray-700'>Credit/Debit Card</span>
                </div>
                
                <div 
                  onClick={()=>setMethod('razorpay')} 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    method === 'razorpay' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === 'razorpay' ? 'border-yellow-500' : 'border-gray-300'
                  }`}>
                    {method === 'razorpay' && <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>}
                  </div>
                  <img src={assets.razorpay_logo} alt="Razorpay" className='h-6'/>
                  <span className='font-medium text-gray-700'>UPI/Wallet</span>
                </div>
                
                <div 
                  onClick={()=>setMethod('cod')} 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    method === 'cod' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === 'cod' ? 'border-yellow-500' : 'border-gray-300'
                  }`}>
                    {method === 'cod' && <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>}
                  </div>
                  <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center'>
                    <span className='text-green-600 text-xs font-bold'>₹</span>
                  </div>
                  <span className='font-medium text-gray-700'>Cash on Delivery</span>
                </div>
              </div>

              <button 
                disabled
                className='w-full bg-gray-400 text-white py-4 px-8 rounded-xl font-semibold text-lg cursor-not-allowed'
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
