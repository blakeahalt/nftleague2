/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function Profile({ newCS }) {
    const [stats, setStats] = useState([]);
    const [collection, setCollection] = useState([]);
    const [collectionSearch, setCollectionSearch] = useState('');

    const options = { method: 'GET', headers: { accept: 'application/json' } };

    async function getStats() {
        const baseURL = `https://api.opensea.io/api/v1/collection/${newCS}/stats`;
        const response = await axios.get(baseURL, options);
        setStats([response.data]);
        // console.log('stats data:', stats);
    }

    useEffect(() => {
        getStats();
    }, []);

    // from collection endpoint
    const name = collection.map(function (stat) {
        return [`${stat.collection.name}`];
    });

    const image_url = collection.map(function (stat) {
        return [`${stat.collection.image_url}`];
    });

    // from collection/stats endpoint
    const floor_price = stats.map(function (stat) {
        if (stat.stats.floor_price) {
            return [`${stat.stats.floor_price.toFixed(2)}`].join('');
        } else {
            return [`${stat.stats.floor_price}`].join('');
        }
    });

    const seven_day_volume = stats.map(function (stat) {
        return [`${stat.stats.seven_day_volume.toFixed(2)}`].join('');
    });
    // console.log('floor price:', seven_day_volume);

    const seven_day_average_price = stats.map(function (stat) {
        return [`${stat.stats.seven_day_average_price.toFixed(2)}`].join('');
    });
    // console.log('7 Day Avg Price:', seven_day_average_price);

    const seven_day_sales = stats.map(function (stat) {
        return [`${stat.stats.seven_day_sales}`].join('');
    });
    // console.log('7 Day Sales:', seven_day_sales);

    const average_price = stats.map(function (stat) {
        return [`${stat.stats.average_price.toFixed(2)}`].join('');
    });
    // console.log('Average Price:', average_price);

    async function getCollection() {
        const baseURL = `https://api.opensea.io/api/v1/collection/${newCS}`;
        const response = await axios.get(baseURL, options);
        setCollection([response.data]);
    }
    // console.log('collection data:', collection);
    // console.log('stats data:', stats);

    // function onClick() {
    //     getCollection()
    //     }

    useEffect(() => {
        getCollection();
    }, []);

    function callFunctions() {
        getStats();
        getCollection();
    }

    // ChartJS.defaults.color = "#ff0000";
    const data = {
        labels: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
        datasets: [
            {
                type: 'line',
                label: 'Floor',
                data: [
                    { x: 'M', y: average_price },
                    { x: 'T', y: seven_day_average_price },
                    { x: 'W', y: floor_price },
                    { x: 'Th', y: floor_price },
                    { x: 'F', y: floor_price },
                    { x: 'Sa', y: floor_price },
                    { x: 'Su', y: floor_price },
                ],
                fill: false,
                borderColor: 'rgba(190, 56, 242, 1)',
                backgroundColor: 'rgba(190, 56, 242, 1)',
            },
            {
                type: 'bar',
                label: 'Sales',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                data: [
                    { x: 'M', y: average_price },
                    { x: 'T', y: seven_day_average_price },
                    { x: 'W', y: floor_price },
                    { x: 'Th', y: floor_price },
                    { x: 'F', y: floor_price },
                    { x: 'Sa', y: floor_price },
                    { x: 'Su', y: floor_price },
                ],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                type: 'scatter',
                label: 'Indiv Sales',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                data: [
                    { x: 'M', y: 3 },
                    { x: 'M', y: 5 },
                    { x: 'M', y: 29 },
                    { x: 'T', y: 3 },
                    { x: 'T', y: 12 },
                    { x: 'T', y: 18 },
                    { x: 'W', y: seven_day_sales },
                    { x: 'W', y: 12 },
                    { x: 'W', y: 18 },
                    20,
                    25,
                    40,
                    23,
                    2,
                ],
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                yAxisID: 'y',
            },
        ],
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                    },
                },
                y: {
                    ticks: {
                        color: (context) => {
                            console.log(context);
                        },
                    },
                },
            },
        },
    };

    function DoughnutChart() {
        return (
            <div>
                <h3>{name}</h3>
                <Line data={data} />
            </div>
        );
    }

    return (
        <>
            <div className="App-image">
                <img
                    src={image_url}
                    height="100"
                    alt="URL"
                    style={{ display: 'flex', flexDirection: 'column' }}
                />
            </div>
            <div className="App-image">{name}</div>
            <div>Floooor Price: Ξ {floor_price}</div>
            {/* <p>Average Price: {average_price}</p> */}
            <div>7 Day Volume: Ξ {seven_day_volume}</div>
            <div>7 Day Sales: {seven_day_sales}</div>
            <div>7 Day Avg Price: Ξ {seven_day_average_price}</div>
            <br />
            <br />
            {/* </Stack> */}
            <DoughnutChart options={options} />
        </>
    );
}

export default Profile;
