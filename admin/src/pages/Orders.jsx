import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/order/list")
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Order status updated")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Packing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Out for delivery': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-100'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600'></div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Order Management</h1>
          <div className='w-20 h-1 bg-linear-to-r from-green-400 to-green-600 rounded-full'></div>
          <p className='text-gray-600 mt-3'>Track and manage customer orders</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-8'>
          {[
            { status: 'Order Placed', color: 'blue' },
            { status: 'Packing', color: 'yellow' },
            { status: 'Shipped', color: 'purple' },
            { status: 'Out for delivery', color: 'orange' },
            { status: 'Delivered', color: 'green' }
          ].map((item) => {
            const count = orders.filter(order => order.status === item.status).length
            return (
              <div key={item.status} className={`bg-linear-to-r from-${item.color}-50 to-${item.color}-100 p-4 rounded-xl border border-${item.color}-200`}>
                <h3 className={`text-sm font-semibold text-${item.color}-800`}>{item.status}</h3>
                <p className={`text-xl font-bold text-${item.color}-600`}>{count}</p>
              </div>
            )
          })}
        </div>

        {orders.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📋</div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No orders found</h3>
            <p className='text-gray-500'>Orders will appear here when customers make purchases</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order, index) => (
              <div key={index} className='border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-4'>
                  <div className='flex items-center gap-4 mb-4 lg:mb-0'>
                    <div className='w-12 h-12 bg-linear-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold'>
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-800'>Order ID: {order._id}</h3>
                      <p className='text-sm text-gray-600'>
                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className='text-lg font-bold text-gray-800'>₹{order.amount}</span>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                  <h4 className='font-semibold text-gray-800 mb-2'>Customer Details</h4>
                  <div className='grid md:grid-cols-2 gap-4 text-sm'>
                    <div>
                      <p><span className='font-medium'>Name:</span> {order.address.firstName} {order.address.lastName}</p>
                      <p><span className='font-medium'>Email:</span> {order.address.email}</p>
                      <p><span className='font-medium'>Phone:</span> {order.address.phone}</p>
                    </div>
                    <div>
                      <p><span className='font-medium'>Address:</span></p>
                      <p className='text-gray-600'>
                        {order.address.street}, {order.address.city}<br/>
                        {order.address.state} - {order.address.zipcode}<br/>
                        {order.address.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4 className='font-semibold text-gray-800 mb-3'>Order Items</h4>
                  <div className='space-y-2'>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className='flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-lg'>
                        <img src={item.images[0]} alt={item.name} className='w-16 h-16 object-cover rounded-lg' />
                        <div className='flex-1'>
                          <h5 className='font-medium text-gray-800'>{item.name}</h5>
                          <p className='text-sm text-gray-600'>Size: {item.size} | Quantity: {item.quantity}</p>
                          <p className='text-sm font-medium text-gray-800'>₹{item.price} each</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-gray-800'>₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-700'>Update Status:</span>
                    <select 
                      onChange={(event) => statusHandler(event, order._id)} 
                      value={order.status}
                      className='px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm'
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  
                  <div className='text-sm text-gray-600'>
                    Payment: <span className='font-medium'>{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders