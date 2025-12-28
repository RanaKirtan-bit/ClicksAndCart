import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const InventoryManagement = ({ token }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const response = await axios.get(
          backendUrl + '/api/product/stock-levels',
          { headers: { token } }
        )
        setProducts(response.data.products)
      } catch (err) {
        setError('Failed to fetch stock levels')
      } finally {
        setLoading(false)
      }
    }

    fetchStockLevels()
  }, [])

  const handleStockUpdate = async (productId, stock) => {
    try {
      await axios.post(
        backendUrl + '/api/product/update-stock',
        { productId, stock: Number(stock) },
        { headers: { token } }
      )
      toast.success('Stock updated successfully')
    } catch (err) {
      toast.error('Failed to update stock')
    }
  }

  const getImageSrc = (product) => {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0]
  }
  if (typeof product.images === 'string') return product.images
  return null
}


  const updateLocalStock = (id, value) => {
    setProducts(prev =>
      prev.map(p =>
        p._id === id ? { ...p, stock: value } : p
      )
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length
  const outOfStock = products.filter(p => p.stock === 0).length

  return (
    <div className="max-w-full sm:max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Inventory Management
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Monitor and update product stock levels
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-linear-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">{products.length}</p>
          </div>

          <div className="bg-linear-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
            <h3 className="text-sm font-semibold text-yellow-800">Low Stock</h3>
            <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
          </div>

          <div className="bg-linear-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
            <h3 className="text-sm font-semibold text-red-800">Out of Stock</h3>
            <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
  <tr className="bg-gray-100 text-gray-700 text-sm">
    <th className="p-3 text-left rounded-l-xl">Image</th>
    <th className="p-3 text-left">Product Name</th>
    <th className="p-3 text-center">Stock</th>
    <th className="p-3 text-center rounded-r-xl">Action</th>
  </tr>
</thead>

<tbody>
  {products.map(product => {
    const imageSrc = getImageSrc(product)

    return (
      <tr
        key={product._id}
        className={`border-b hover:bg-gray-50 transition ${
          product.stock === 0
            ? 'bg-red-50'
            : product.stock < 10
            ? 'bg-yellow-50'
            : ''
        }`}
      >
        {/* Image */}
        <td className="p-3">
          <div className="w-14 h-14 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-100">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              <span className="text-gray-400 text-xl">📷</span>
            )}
          </div>
        </td>

        {/* Name */}
        <td className="p-3 font-medium text-gray-800">
          {product.name}
        </td>

        {/* Stock Input */}
        <td className="p-3 text-center">
          <input
            type="number"
            value={product.stock}
            onChange={(e) =>
              updateLocalStock(product._id, e.target.value)
            }
            className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none text-center"
          />
        </td>

        {/* Action */}
        <td className="p-3 text-center">
          <button
            onClick={() =>
              handleStockUpdate(product._id, product.stock)
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Update
          </button>
        </td>
      </tr>
    )
  })}
</tbody>

          </table>

          {products.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              📦 No products available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement
