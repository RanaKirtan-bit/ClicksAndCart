import React from 'react'
import {assets} from '../assets/assets/frontend_assets/assets'
import Title from './Title'

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy.",
      gradient: "from-blue-50 to-indigo-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy.",
      gradient: "from-green-50 to-emerald-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support.",
      gradient: "from-purple-50 to-violet-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <div className='bg-linear-to-r from-gray-50 to-white py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-align-center mb-2 text-align-center text-3xl py-8'>
          <Title text1={'Our'} text2={'Commitment'}/>
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base tetx-gray-600'>
            These are what we provide more than just a fashion products. 
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
          {policies.map((policy, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${policy.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className='relative z-10 text-center'>
                <div className={`w-20 h-20 ${policy.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                  <img 
                    src={policy.icon} 
                    alt={policy.title} 
                    className='w-10 h-10 group-hover:scale-110 transition-transform duration-300'
                  />
                </div>
                
                <h3 className='text-lg md:text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300'>
                  {policy.title}
                </h3>
                
                <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                  {policy.description}
                </p>
                
                <div className='mt-6 w-12 h-1 bg-linear-to-r from-gray-300 to-gray-400 group-hover:from-blue-400 group-hover:to-purple-400 mx-auto rounded-full transition-all duration-500'></div>
              </div>
              
              <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurPolicy

