
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { backendUrl } from "../App";
import { chartOptions } from "../config/chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const fetchCategoryWiseOrders = async () => {
  try {
    const response = await axios.get(
      backendUrl + "/api/order/categorywise-order",
    );

    if (response.data.success) {
      setCategoryData(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching category-wise orders:", error);
  }
};

useEffect(() => {
    fetchCategoryWiseOrders();
  }, []);

  
  const chartData = {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        label: "Category Wise Orders",
        data: categoryData.map(item => item.totalOrders),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },  
    ],
  };
  console.log(chartData);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
