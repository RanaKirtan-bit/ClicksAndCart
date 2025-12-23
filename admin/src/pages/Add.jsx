import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData()
      
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)
      
      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Add New Product</h1>
          <div className='w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full'></div>
          <p className='text-gray-600 mt-3'>Fill in the details below to add a new product to your store</p>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-8'>
          {/* Image Upload Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Product Images</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { image: image1, setImage: setImage1, label: "Main Image" },
                { image: image2, setImage: setImage2, label: "Image 2" },
                { image: image3, setImage: setImage3, label: "Image 3" },
                { image: image4, setImage: setImage4, label: "Image 4" }
              ].map((item, index) => (
                <div key={index} className='group'>
                  <label htmlFor={`image${index + 1}`} className='cursor-pointer block'>
                    <div className='relative border-2 border-dashed border-gray-300 rounded-xl p-2 hover:border-yellow-400 transition-colors duration-300 group-hover:bg-yellow-50 h-36 flex items-center justify-center'>
                      {item.image ? (
                        <img 
                          className='w-full h-full object-cover rounded-lg' 
                          src={URL.createObjectURL(item.image)} 
                          alt="Selected" 
                        />
                      ) : (
                        <div className='text-center'>
                          <div className='text-4xl text-gray-400 mb-2'>📷</div>
                          <span className='text-sm font-medium text-gray-600'>{item.label}</span>
                          <p className='text-xs text-gray-500 mt-1'>Click to upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input 
                    onChange={(e) => item.setImage(e.target.files[0])} 
                    type="file" 
                    id={`image${index + 1}`} 
                    accept="image/*"
                    hidden 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Product Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200' 
                type="text" 
                placeholder='Enter product name' 
                required 
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Price (₹)</label>
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200' 
                type="number" 
                placeholder='Enter price' 
                required 
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Product Description</label>
            <textarea 
              onChange={(e) => setDescription(e.target.value)} 
              value={description} 
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200 resize-none' 
              placeholder='Write product description' 
              rows={4} 
              required 
            />
          </div>

          {/* Category and Subcategory */}
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
              <select 
                onChange={(e) => setCategory(e.target.value)} 
                value={category}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200'
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Sub Category</label>
              <select 
                onChange={(e) => setSubCategory(e.target.value)} 
                value={subCategory}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors duration-200'
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>Available Sizes</label>
            <div className='flex flex-wrap gap-3'>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div 
                  key={size}
                  onClick={() => setSizes(prev => 
                    prev.includes(size) 
                      ? prev.filter(item => item !== size)
                      : [...prev, size]
                  )}
                  className={`px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    sizes.includes(size)
                      ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
                      : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className='flex items-center gap-3'>
            <input 
              onChange={() => setBestseller(prev => !prev)} 
              checked={bestseller} 
              type="checkbox" 
              id="bestseller"
              className='w-5 h-5 text-yellow-600 border-2 border-gray-300 rounded focus:ring-yellow-500'
            />
            <label htmlFor="bestseller" className='text-sm font-medium text-gray-700 cursor-pointer'>
              Add to bestseller
            </label>
          </div>

          <button 
            type='submit' 
            className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95'
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add