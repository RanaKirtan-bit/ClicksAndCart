import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(()=>{
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            size: item,
            quantity:cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  },[cartItems])
  return (
    <div className='bg-gradient-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 max-w-6xl mx-auto px-4'>
        
        <div className='text-center mb-12'>
          <div className='text-3xl md:text-4xl mb-4'>
            <Title text1={'YOUR'} text2={'CART'}/>
          </div>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        {cartData.length === 0 ? (
          
          <div className='text-center py-20'>
            <div className='bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto'>
              <div className='w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <img src={assets.cart_icon} alt="" className='w-12 h-12 opacity-50'/>
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Your cart is empty</h3>
              <p className='text-gray-600 mb-8'>Add some products to get started!</p>
              <button 
                onClick={() => navigate('/collection')} 
                className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className='space-y-4 mb-12'>
              {
                cartData.map((item, index)=>{
                  const productData = products.find((product) => product._id === item._id);

                  return (
                    <div key={index} className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
                      <div className='grid grid-cols-1 md:grid-cols-[1fr_auto_auto] items-center gap-6'>
                        
                        <div className='flex items-center gap-6'>
                          <div className='relative group'>
                            <img 
                              src={productData.image[0]} 
                              alt="" 
                              className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight'>{productData.name}</h3>
                            <div className='flex items-center gap-4 flex-wrap'>
                              <p className='text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent'>
                                {currency}{productData.price}
                              </p>
                              <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                Size: {item.size}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                          <label className='text-sm font-medium text-gray-600'>Qty:</label>
                          <div className='relative'>
                            <input 
                              onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                              type="number" 
                              min={1} 
                              defaultValue={item.quantity} 
                              className='w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:border-yellow-500 focus:outline-none transition-colors duration-200'
                            />
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, 0)} 
                          className='p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all duration-200 hover:scale-110 group'
                          title='Remove item'
                        >
                          <img src={assets.bin_icon} alt="" className='w-5 h-5 group-hover:scale-110 transition-transform duration-200'/>
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className='flex justify-end'>
              <div className='w-full md:w-[500px]'>
                <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
                  <CartTotal />
                  <button 
                    onClick={() => navigate('/place-order')} 
                    className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 px-8 rounded-xl font-semibold text-lg mt-8 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95'
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>    
    </div>
  )
}

export default Cart
