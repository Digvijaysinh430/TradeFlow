import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the scales/elements this bar chart needs.
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

const GAIN_COLOR = "#16a34a";
const LOSS_COLOR = "#dc2626";

function PnlChart({ holdings = [] }) {
  const labels = holdings.map((h) => h.symbol);
  const values = holdings.map((h) => h.pnl);
  const colors = values.map((v) => (v >= 0 ? GAIN_COLOR : LOSS_COLOR));

  const data = {
    labels,
    datasets: [
      {
        label: "Unrealized P&L",
        data: values,
        backgroundColor: colors,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => formatINR(ctx.parsed.y),
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatINR(value),
        },
      },
    },
  };

  return (
    <div style={{ height: "320px", position: "relative" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default PnlChart;