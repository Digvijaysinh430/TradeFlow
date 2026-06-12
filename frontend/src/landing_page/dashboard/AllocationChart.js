import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js v3+ is tree-shakeable: register only the pieces this chart uses.
ChartJS.register(ArcElement, Tooltip, Legend);

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

// A small fixed palette; cash always gets the last (grey) slice.
const SLICE_COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#db2777",
  "#7c3aed",
  "#0891b2",
  "#dc2626",
  "#65a30d",
  "#ea580c",
  "#0d9488",
];
const CASH_COLOR = "#9ca3af";

function AllocationChart({ holdings = [], cashBalance = 0 }) {
  const labels = holdings.map((h) => h.symbol);
  const values = holdings.map((h) => h.currentValue);

  // append cash as its own slice
  labels.push("Cash");
  values.push(cashBalance);

  const backgroundColor = holdings.map(
    (_, i) => SLICE_COLORS[i % SLICE_COLORS.length]
  );
  backgroundColor.push(CASH_COLOR);

  const total = values.reduce((sum, v) => sum + v, 0);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 16, font: { size: 13 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed;
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${formatINR(value)} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "320px", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default AllocationChart;