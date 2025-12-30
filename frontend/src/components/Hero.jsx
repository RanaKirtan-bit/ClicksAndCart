import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [
    {
      id: 1,
      title: "Latest Arrivals",
      subtitle: "OUR BESTSELLER",
      buttonText: "SHOP NOW",
      image: assets.banner2,
      bgGradient: "from-blue-50 to-indigo-100"
    },
    {
      id: 2,
      title: "Summer Collection",
      subtitle: "TRENDING NOW",
      buttonText: "EXPLORE",
      image: assets.banner1,
      bgGradient: "from-pink-50 to-rose-100"
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "LIMITED TIME",
      buttonText: "GET DEALS",
      image: assets.banner3,
      bgGradient: "from-green-50 to-emerald-100"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative overflow-hidden bg-linear-to-r from-gray-50 to-white'>
      
      <div 
        className='flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${currentBanner * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className={`min-w-full flex flex-col sm:flex-row bg-linear-to-r ${banner.bgGradient}`}>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-20 px-8'>
              <div className='text-[#414141] max-w-md'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-8 md:w-12 h-[2px] bg-linear-to-r from-[#414141] to-gray-300 animate-pulse'></div>
                  <p className='font-medium text-sm md:text-base tracking-wider opacity-80'>{banner.subtitle}</p>
                </div>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                  {banner.title}
                </h1>
                <div className='flex items-center gap-3 group cursor-pointer'>
                  <p className='font-semibold text-sm md:text-base tracking-wide group-hover:text-blue-600 transition-colors duration-300'>{banner.buttonText}</p>
                  <div className='w-8 md:w-12 h-[2px] bg-[#414141] group-hover:w-16 transition-all duration-300'></div>
                </div>
              </div>
            </div>
            <div className='w-full sm:w-1/2 relative overflow-hidden h-64 sm:h-96 lg:h-[500px]'>
              <img 
                src={banner.image} 
                alt={banner.title} 
                className='w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentBanner === index 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110'
      >
        <svg className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110'
      >
        <svg className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </div>
  )
}

export default Hero
