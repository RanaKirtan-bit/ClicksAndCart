import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";
import UpdateStock from "./pages/UpdateStock";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProduct from "./pages/UpdateProduct";

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):'');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(()=>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="flex w-full relative">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 w-full lg:ml-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/add" replace />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/update-stock" element={<UpdateStock token={token} />} />
                <Route path="/update-product" element={<UpdateProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;