import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const UpdateStock = ({ token }) => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('id')

  const [product, setProduct] = useState(null)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/single", { productId })
      if (response.data.success) {
        setProduct(response.data.product)
        setSizes(response.data.product.sizes.map(size => ({ ...size, stock: size.stock.toString() })))
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

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleStockChange = (size, stock) => {
    setSizes(prev => prev.map(item => item.size === size ? { ...item, stock } : item))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const response = await axios.post(backendUrl + "/api/product/update-stock", {
        productId,
        sizes: sizes.map(item => ({ size: item.size, stock: Number(item.stock) }))
      }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        fetchProduct() // Refresh data
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600'></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6'>
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center'>
          <div className='text-gray-400 text-6xl mb-4'>📦</div>
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>Product not found</h3>
          <p className='text-gray-500'>The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8'>
        <div className='mb-6 sm:mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Update Stock</h1>
          <div className='w-16 sm:w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full'></div>
          <p className='text-gray-600 mt-3 text-sm sm:text-base'>Update stock levels for {product.name}</p>
        </div>

        <div className='mb-6 p-4 bg-gray-50 rounded-xl'>
          <h3 className='font-semibold text-gray-800 mb-2'>Product Details</h3>
          <div className='grid sm:grid-cols-2 gap-4 text-sm'>
            <div><span className='font-medium'>Name:</span> {product.name}</div>
            <div><span className='font-medium'>Category:</span> {product.category} - {product.subCategory}</div>
            <div><span className='font-medium'>Price:</span> ₹{product.price}</div>
            <div><span className='font-medium'>Total Stock:</span> {sizes.reduce((acc, size) => acc + Number(size.stock), 0)}</div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-4'>Update Stock by Size</label>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
              {sizes.map((size) => (
                <div key={size.size} className='bg-gray-50 p-4 rounded-xl border border-gray-200'>
                  <label className='block text-sm font-medium text-gray-700 mb-2 text-center'>
                    Size {size.size}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={size.stock}
                    onChange={(e) => handleStockChange(size.size, e.target.value)}
                    className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 text-center font-semibold'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={updating}
              className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {updating ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  Updating...
                </div>
              ) : (
                'Update Stock'
              )}
            </button>
            <button
              type='button'
              onClick={() => window.history.back()}
              className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateStock
