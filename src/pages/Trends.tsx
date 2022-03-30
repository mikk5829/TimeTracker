import * as React from 'react';
import {Typography} from "@mui/material";
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
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

    return (
        <div>
            <Typography variant={"h1"}>Trends</Typography>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height="auto"
                width="100%"
            />
        </div>
    );
}