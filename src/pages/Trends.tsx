import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            plotOptions: {
                bar: {
                    borderRadius: 8
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
                title: {
                    text: "Month"
                }
            },
            yaxis: {
                title: {
                    text: "Hours"
                }
            },
            title: {
                text: 'Title of chart',
                style: {
                    fontSize:  '16px',
                    fontWeight:  'bold',
                    fontFamily:  undefined,
                    color:  'black'
                }
            }
            // ,
            // theme: {
            //     mode: 'light',
            //     palette: 'palette1',
            //
            // }

        },
        series: [
            {
                name: "Reading",
                data: [30, 40, 45, 50, 49, 60, 70, 91],

            },
            {
                name: "Studying",
                type: "column",
                data: [23, 12, 54, 61, 32, 56, 81, 19]
            }
            ,
            {
                name: "Exercise",
                type: "column",
                data: [4, 32, 12, 41, 18, 81, 73, 43]
            }
        ]
    };

    return (
        <div>
            <Typography variant={"h1"}>Summary</Typography>
            <Typography variant={"h1"}>Details (?)</Typography>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height="350"
                width="100%"
            />
            <ReactApexChart
                type="line"
                options={state.options}
                series={state.series}
                width="100%"
                height="350"
                />
            <ReactApexChart
                type="area"
                options={state.options}
                series={state.series}
                width="100%"
                height="350"
            />
        </div>
    );
}