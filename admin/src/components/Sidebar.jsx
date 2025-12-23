import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col gap-2 pt-8 px-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Dashboard</h2>
          <div className="w-full h-px bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
        </div>
        
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-yellow-50 group ${
              isActive || window.location.pathname === '/' 
                ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-500 text-yellow-700 shadow-sm" 
                : "text-gray-600 hover:text-yellow-600"
            }`
          }
        >
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            window.location.pathname === '/' || window.location.pathname === '/add'
              ? "bg-yellow-200" 
              : "bg-gray-100 group-hover:bg-yellow-100"
          }`}>
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Add Products</p>
            <p className="text-xs opacity-75">Add new items to store</p>
          </div>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group ${
              isActive 
                ? "bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-500 text-blue-700 shadow-sm" 
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            window.location.pathname === '/list'
              ? "bg-blue-200" 
              : "bg-gray-100 group-hover:bg-blue-100"
          }`}>
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Product List</p>
            <p className="text-xs opacity-75">View & manage products</p>
          </div>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-green-50 group ${
              isActive 
                ? "bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 text-green-700 shadow-sm" 
                : "text-gray-600 hover:text-green-600"
            }`
          }
        >
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            window.location.pathname === '/orders'
              ? "bg-green-200" 
              : "bg-gray-100 group-hover:bg-green-100"
          }`}>
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Orders</p>
            <p className="text-xs opacity-75">Manage customer orders</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;