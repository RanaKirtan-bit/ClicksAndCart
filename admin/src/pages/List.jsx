import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        console.log('Full product data:', response.data.products[0])
        console.log('Image array:', response.data.products[0]?.images)
        console.log('First image URL:', response.data.products[0]?.images?.[0])
        setList(response.data.products.reverse())
        setFilteredList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  useEffect(() => {
    let filtered = list

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    setFilteredList(filtered)
  }, [searchTerm, categoryFilter, list])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-100'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600'></div>
      </div>
    )
  }

  return (
    <div className='max-w-full sm:max-w-7xl mx-auto p-4 sm:p-6'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8'>
        <div className='mb-6 sm:mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Product Management</h1>
          <div className='w-16 sm:w-20 h-1 bg-linear-to-r from-blue-400 to-blue-600 rounded-full'></div>
          <p className='text-gray-600 mt-3 text-sm sm:text-base'>Manage your store products - view, search, and remove items</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8'>
          <div className='flex-1'>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base'
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm sm:text-base'
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8'>
          <div className='bg-linear-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl border border-blue-200'>
            <h3 className='text-sm sm:text-lg font-semibold text-blue-800'>Total Products</h3>
            <p className='text-xl sm:text-2xl font-bold text-blue-600'>{list.length}</p>
          </div>
          <div className='bg-linear-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-xl border border-green-200'>
            <h3 className='text-sm sm:text-lg font-semibold text-green-800'>Bestsellers</h3>
            <p className='text-xl sm:text-2xl font-bold text-green-600'>{list.filter(item => item.bestseller).length}</p>
          </div>
          <div className='bg-linear-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl border border-purple-200'>
            <h3 className='text-sm sm:text-lg font-semibold text-purple-800'>Filtered Results</h3>
            <p className='text-xl sm:text-2xl font-bold text-purple-600'>{filteredList.length}</p>
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className='text-center py-8 sm:py-12'>
            <div className='text-gray-400 text-4xl sm:text-6xl mb-4'>📦</div>
            <h3 className='text-lg sm:text-xl font-semibold text-gray-600 mb-2'>No products found</h3>
            <p className='text-gray-500 text-sm sm:text-base'>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {filteredList.map((item, index) => {
              const getImageSrc = (item) => {
                if (item.images && Array.isArray(item.images) && item.images.length > 0) {
                  return item.images[0];
                }
                if (item.image && Array.isArray(item.image) && item.image.length > 0) {
                  return item.image[0];
                }
                if (typeof item.images === 'string') {
                  return item.images;
                }
                if (typeof item.image === 'string') {
                  return item.image;
                }
                return null;
              };
              
              const imageSrc = getImageSrc(item);
              
              return (
              <div key={index} className='bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <div className='relative'>
                  {imageSrc ? (
                    <img 
                      className='w-full h-40 sm:h-48 object-contain' 
                      src={imageSrc} 
                      alt={item.name || 'Product'}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className='w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center text-gray-500'
                    style={{display: imageSrc ? 'none' : 'flex'}}
                  >
                    <div className='text-center'>
                      <div className='text-3xl sm:text-4xl mb-2'>📷</div>
                      <p className='text-xs sm:text-sm'>No Image</p>
                    </div>
                  </div>
                  {item.bestseller && (
                    <div className='absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>
                      Bestseller
                    </div>
                  )}
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200'
                  >
                    <svg className='w-3 h-3 sm:w-4 sm:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </button>
                </div>
                
                <div className='p-3 sm:p-4'>
                  <h3 className='font-semibold text-gray-800 mb-2 truncate text-sm sm:text-base'>{item.name}</h3>
                  <p className='text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2'>{item.description}</p>
                  
                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-base sm:text-lg font-bold text-gray-800'>₹{item.price}</span>
                    <div className='flex gap-1'>
                      <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>{item.category}</span>
                      <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>{item.subCategory}</span>
                    </div>
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-1 flex-wrap'>
                      {item.sizes && item.sizes.slice(0, 3).map((size, idx) => (
                        <span key={idx} className='px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded'>
                          {size}
                        </span>
                      ))}
                      {item.sizes && item.sizes.length > 3 && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>
                          +{item.sizes.length - 3}
                        </span>
                      )}
                    </div>
                    <span className='text-xs text-gray-500 hidden sm:block'>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default List