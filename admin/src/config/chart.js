export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#374151", // slate-700
        font: {
          size: 14,
          weight: "600",
        },
        padding: 20,
      },
    },

    title: {
      display: true,
      text: "Category-wise Orders",
      color: "#111827", // gray-900
      font: {
        size: 18,
        weight: "bold",
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },

    tooltip: {
      backgroundColor: "#111827",
      titleColor: "#fff",
      bodyColor: "#e5e7eb",
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#374151",
        font: {
          size: 13,
          weight: "500",
        },
      },
    },

    y: {
      beginAtZero: true,
      min: 0,
      suggestedMax: 2,
      grid: {
        color: "#e5e7eb",
        drawBorder: true,
      },
      ticks: {
        color: "#6b7280",
        font: {
          size: 12,
        },
        stepSize: 1,
        display: true,
        precision: 0,
      },
    },
  },

  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
};
