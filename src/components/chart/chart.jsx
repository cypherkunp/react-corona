import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './chart.module.css';

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchDailyDataAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchDailyDataAPI();
  }, []);
  console.log(dailyData);

  return (
    <div className={styles.container}>
      {dailyData && dailyData.length ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [
              {
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              },
              {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
            ],
          }}
        />
      ) : null}
    </div>
  );
};

export default Chart;
