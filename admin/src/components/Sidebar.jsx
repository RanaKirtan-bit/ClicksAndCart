import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-[18%] min-h-screen bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col gap-2 pt-6 lg:pt-8 px-3 lg:px-4">
          <div className="mb-4">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Dashboard</h2>
            <div className="w-full h-px bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </div>
          
          <NavLink
            to="/add"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 hover:bg-yellow-50 group ${
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
              <img src={assets.add_icon} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm lg:text-base truncate">Add Products</p>
              <p className="text-xs opacity-75 truncate">Add new items to store</p>
            </div>
          </NavLink>

          <NavLink
            to="/list"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group ${
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
              <img src={assets.order_icon} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm lg:text-base truncate">Product List</p>
              <p className="text-xs opacity-75 truncate">View & manage products</p>
            </div>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 hover:bg-purple-50 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-100 to-purple-50 border-l-4 border-purple-500 text-purple-700 shadow-sm"
                  : "text-gray-600 hover:text-purple-600"
              }`
            }
          >
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              window.location.pathname === '/orders'
                ? "bg-purple-200"
                : "bg-gray-100 group-hover:bg-purple-100"
            }`}>
              <img src={assets.order_icon} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm lg:text-base truncate">Orders</p>
              <p className="text-xs opacity-75 truncate">Manage customer orders</p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;