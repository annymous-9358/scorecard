import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;