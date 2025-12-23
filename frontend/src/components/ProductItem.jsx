import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets/frontend_assets/assets';

const ProductItem = ({id,image,name,price}) => {

      const {currency} = useContext(ShopContext);


  return (
    <Link to={`/product/${id}`} className='group block cursor-pointer'>
      <div className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200'>

        <div className='relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100'>
          <img 
            src={image && image[0]} 
            alt={name} 
            className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
            <div className='bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg'>
              <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
              </svg>
            </div>
          </div>
        </div>
        
        <div className='p-4 space-y-2'>
          <h3 className='text-gray-800 text-sm font-medium leading-tight group-hover:text-gray-900 transition-colors duration-200 line-clamp-2'>
            {name}
          </h3>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-200'>
              {currency}{price}
            </p>
            <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
              <div className='bg-blue-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium'>
                View
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
