import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart, token, navigate} = useContext(ShopContext);
  const [productData, setProductData] = useState(false); 
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id == productId){
        setProductData(item)
        setImage(item.images[0])
        return null;
      }
    });
  }

  useEffect(() => {
    fetchProductData();
  },[productId])

  return productData ? (
    <div className='bg-gradient-to-b from-yellow-50/30 to-white min-h-screen'>
      <div className='border-t border-gray-200 pt-12 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-6 lg:gap-8 flex-col lg:flex-row max-w-7xl mx-auto px-4'>
          <div className='flex-1 flex flex-col-reverse gap-4 lg:flex-row'>            
            <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start lg:w-28 gap-2 lg:h-full lg:max-h-[600px] scrollbar-hide'>
              {
                productData.images.map((item, index)=>(
                  <img 
                    onClick={()=>setImage(item)} 
                    src={item} 
                    key={index} 
                    alt="" 
                    className={`w-20 h-20 lg:w-full lg:h-28 object-cover rounded-xl cursor-pointer transition-all duration-300 border-2 flex-shrink-0 ${
                      image === item ? 'border-yellow-500 shadow-lg scale-105' : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  />
                ))
              }
            </div>
            
            <div className='flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg lg:h-full lg:max-h-[600px] flex items-center'>
              <img src={image} alt="" className='w-full h-auto max-h-full object-contain rounded-xl hover:scale-105 transition-transform duration-500'/>
            </div>
          </div>

          <div className='flex-1 lg:pl-6'>
            <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight'>{productData.name}</h1>
              
              <div className='flex items-center gap-2 mb-6'>
                <div className='flex gap-1'>
                  <img src={assets.star_icon} alt="" className="w-5 h-5" />
                  <img src={assets.star_icon} alt="" className="w-5 h-5" />
                  <img src={assets.star_icon} alt="" className="w-5 h-5" />
                  <img src={assets.star_icon} alt="" className="w-5 h-5" />
                  <img src={assets.star_dull_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-gray-600 font-medium">(122 reviews)</p>
              </div>
              
              <div className='mb-6'>
                <p className='text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent'>
                  {currency}{productData.price}
                </p>
              </div>
              
              <p className='text-gray-600 leading-relaxed mb-8 text-lg'>{productData.description}</p>
              <p className='text-lg font-semibold text-gray-800 mb-4'>Remaining Stock:</p>
              <p className='text-gray-600 leading-relaxed mb-8 text-lg'>
  {productData.sizes
    ? Object.values(productData.sizes).reduce((a, b) => a + b, 0)
    : productData.totalStock}
</p>

              
              <div className='mb-8'>
                <p className='text-lg font-semibold text-gray-800 mb-4'>Select Size</p>
                <div className='flex gap-3 flex-wrap'>
                  {productData.sizes && Object.entries(productData.sizes).map(
  ([sizeKey, qty]) => (
    <button
      key={sizeKey}
      disabled={qty <= 0}
      onClick={() => setSize(sizeKey)}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        size === sizeKey
          ? 'bg-yellow-500 text-white shadow-lg scale-105'
          : qty <= 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 hover:scale-105'
      }`}
    >
      {sizeKey}
    </button>
  )
)}

                </div>
              </div>
              
              <button 
                onClick={()=>{
                  if(!token) {
                    toast.error('Please login to add items to cart')
                    navigate('/login')
                    return
                  }
                  
                  addToCart(productData._id, size)
                }} 
                className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 mb-8'
              >
                {token ? 'ADD TO CART' : 'LOGIN TO ADD TO CART'}
              </button>
              
              <div className='border-t border-gray-200 pt-6'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <p className='text-gray-600'>100% Original Product</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <p className='text-gray-600'>Cash on Delivery Available</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    <p className='text-gray-600'>Easy Return & Exchange within 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 mt-16'>
          <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
            <div className='flex border-b border-gray-200'>
              <button className='px-8 py-4 bg-yellow-50 text-yellow-700 font-semibold border-b-2 border-yellow-500'>
                Description
              </button>
              <button className='px-8 py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-200'>
                Reviews (122)
              </button>
            </div>
            
            <div className='p-8'>
              <div className='space-y-4 text-gray-600 leading-relaxed'>
                <p>Experience premium quality with our carefully curated collection. This product represents the perfect blend of style, comfort, and durability that you've been looking for.</p>
                <p>Crafted with attention to detail and using high-quality materials, this item is designed to meet your expectations and provide long-lasting satisfaction. Perfect for any occasion and suitable for your lifestyle needs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>

      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
