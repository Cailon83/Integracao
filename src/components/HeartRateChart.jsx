import React from "react";
import { Line } from "react-chartjs-2";

const HeartRateChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.dataBatimento).toLocaleString()),
    datasets: [
      {
        label: "Batimentos Cardíacos",
        data: data.map((d) => d.bpm),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Data/Hora" } },
      y: { title: { display: true, text: "BPM" }, min: 0 },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HeartRateChart;