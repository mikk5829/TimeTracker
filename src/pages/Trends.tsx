import * as React from 'react';
import {Stack, Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";

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
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September"]
            }
        },
        series: [
            {
                name: "Reading",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
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
            <Typography variant={"h1"}>Trends</Typography>

            <Typography align="center" variant={"h3"}>Stacked bar</Typography>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height="auto"
                width="100%"
                title="hey"
            />
            <Typography align="center" variant={"h3"}>Line</Typography>
            <ReactApexChart
                type="line"
                options={state.options}
                series={state.series}
                height={350}
                />

            <Typography align="center" variant={"h3"}>Area</Typography>
            <ReactApexChart
                type="area"
                options={state.options}
                series={state.series}
                height={350}
            />

        </div>
    );
}