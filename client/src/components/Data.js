/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { React, useState } from 'react';
import { Line } from 'react-chartjs-2';
import LineChart from './LineChart';

function App() {
    const [collData, setCollData] = useState({
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        datasets: [
            {
                label: 'DAYS',
                data: collData.map((data) => data.floor - price),
            },
        ],
    });

    return (
        <div className="App">
            <Line chartData={collData} />
        </div>
    );
}

export default App;
