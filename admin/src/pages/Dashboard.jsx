import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";

const Dashboard = ({ token }) => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    orders: [],
  });

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/monthlyorder", {
        headers: { token },
      });
      if (response.data.success) {
        const orders = response.data.orders;
        const revenue = orders.reduce((acc, curr) => acc + curr.amount, 0);

        setData({
          totalOrders: orders.length,
          totalRevenue: revenue,
          orders: orders,
        });
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-gray-500">Orders per Month </p>
          <h2 className="text-3xl font-bold">{data.totalOrders}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-gray-500">Total Sell per Month </p>
          <h2 className="text-3xl font-bold">₹ {data.totalRevenue}</h2>
        </div>
      </div>

      {/* Placeholder for Product/Category List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Product/Category Wise Ordered List{" "}
        </h3>
        {/* Map through data.orders here to show items */}
      </div>
    </div>
  );
};

export default Dashboard;
