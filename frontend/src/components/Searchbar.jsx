import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets/frontend_assets/assets';

const SearchBar = () => {

  const { search, showSearch, setSearch, setShowSearch } = useContext(ShopContext);    

  return showSearch ? (
    <div className='border-t border-b bg-linear-to-r from-yellow-50 to-white text-center py-8 shadow-sm'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='flex items-center justify-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mr-4'>Search Products</h2>
          <button 
            onClick={() => setShowSearch(false)}
            className='p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110'
          >
            <img src={assets.cross_icon} alt='Close' className='w-4 h-4' />
          </button>
        </div>
        
        <div className='relative mb-6'>
          <div className='flex items-center bg-white border-2 border-gray-200 focus-within:border-yellow-500 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300'>
            <img src={assets.search_icon} alt='Search' className='w-5 h-5 mr-4 text-gray-400' />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              type='text' 
              placeholder='Search for products...'
              className='flex-1 outline-none text-gray-800 placeholder-gray-500 text-lg'
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className='ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200'
              >
                <img src={assets.cross_icon} alt='Clear' className='w-3 h-3' />
              </button>
            )}
          </div>
        </div>
        
        <div>
          <p className='text-sm text-gray-600 mb-3'>Popular searches:</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {['T-shirt', 'Jacket', 'Trousers', 'Top', 'Pant'].map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearch(tag)}
                className='px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105'
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default SearchBar
