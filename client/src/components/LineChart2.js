import { React, useState, useEffect, useRef } from "react";
import axios from 'axios'
import {Stack} from 'rsuite'
import '../App.css' 
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


// defaults.global.tooltips.enabled = false
ChartJS.defaults.scales.color = 'white';
const LineChart = () => {
    return (
      <div>
        <Line
          data={{
            labels: ["M","T","W","Th","F","Sa","Su"],
            datasets: [
              {
                label: '# of votes',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: "rgba(190, 56, 242, 1)",
                backgroundColor: "rgba(190, 56, 242, 1)",
                borderWidth: 1,
              },
              // {
              //   label: 'Quantity',
              //   data: [47, 52, 67, 58, 9, 50],
              //   backgroundColor: 'orange',
              //   borderColor: 'red',
              // },
              
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true, 
                    color: "white",
                    textStrokeColor: 'white'
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 75,
                color: "white",

              },
            },
          }}
        />
      </div>
    )
  

// function DoughnutChart() {
    // return (
    //     <div>
    //         <h3>{name}</h3>  
    //         <BarChart options={options} />  
    //     </div>
// )
}


export default LineChart