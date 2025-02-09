import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data, title }) => {
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

  return <Radar data={data} options={options} />;
};

export default RadarChart;