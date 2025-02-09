import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: title
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;