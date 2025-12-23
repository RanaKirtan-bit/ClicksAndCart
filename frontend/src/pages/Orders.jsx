import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const {currency, token, backendUrl} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if(!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
      if(response.data.success) {
        setOrderData(response.data.orders.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])
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
            orderData.map((order, index) => (
              <div key={index} className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>Order #{order._id.slice(-8)}</h3>
                    <p className='text-sm text-gray-600'>Placed on {new Date(order.date).toDateString()}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-lg font-bold text-gray-800'>{currency}{order.amount}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Packing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'Out for delivery' ? 'bg-orange-100 text-orange-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className='space-y-3'>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                      <img 
                        src={item.images && item.images[0] ? item.images[0] : '/placeholder.jpg'} 
                        alt={item.name} 
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-800'>{item.name}</h4>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                          <span>Size: {item.size}</span>
                          <span>Qty: {item.quantity}</span>
                          <span className='font-medium text-gray-800'>{currency}{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-gray-600'>
                      <p>Payment: <span className='font-medium'>{order.paymentMethod}</span></p>
                      <p>Delivery to: {order.address.firstName} {order.address.lastName}</p>
                    </div>
                    <button className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors duration-200'>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {orderData.length === 0 && (
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
