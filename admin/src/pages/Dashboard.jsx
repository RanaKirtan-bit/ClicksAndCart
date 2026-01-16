import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import Chart from "../components/Chart";

const Dashboard = ({ token }) => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    orders: [],
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");

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

  const fetchCategories = async () => {
     try {
      const response = await axios.get(backendUrl + "/api/category/list");
      if(response.data.success){
        const categories = response.data.categories;
        setCategories(categories);
        console.log(categories);
        return true;
      }
     } catch (error) {
      console.error("Error fetching categories..", error)
     }
  }

  const addCategory = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/category/add", { name: newCategory, description: newCategoryDesc }, { headers: { token } });
      if (response.data.success) {
        setNewCategory("");
        setNewCategoryDesc("");
        fetchCategories();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const removeCategory = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/category/remove", { id }, { headers: { token } });
      if (response.data.success) {
        fetchCategories();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
    fetchCategories();
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

      <div className="bg-white p-6 rounded-xl shadow">
        <Chart />
      </div>

      {/* Category Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Category Management</h3>

        {/* Add Category Form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategoryDesc}
            onChange={(e) => setNewCategoryDesc(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </div>

        {/* List Categories */}
        <div>
          <h4 className="text-md font-semibold mb-2">Categories List</h4>
          <ul className="list-disc pl-5">
            {categories.map((category) => (
              <li key={category._id} className="flex justify-between items-center mb-2">
                <span>{category.name} - {category.description}</span>
                <button
                  onClick={() => removeCategory(category._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
