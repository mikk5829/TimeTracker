import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {usePersistReducer, Event} from "../service/data";
import moment from "moment";


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {

    const [{categories, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);


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
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: 'black'
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

    let barSeries: { name: string, type: string, data: number[]}[] = [];

    events.forEach((event: Event) => {

        let id = event.id;
        var duration = moment.duration(moment(event.endTime).diff(event.startTime));
        var minutes = duration.asMinutes();



        var match = barSeries.find(x => x.name == id);

        if (match == undefined) {
            let minutesArr: number[] = [minutes]
            barSeries.push({
                data: minutes,
                name: id,
                type: "column"
            });
        } else {
            match.data.push(minutes);
        }
        console.log(barSeries);
    });

    return (
        <div>
            <Typography variant={"h1"}>Trends</Typography>

            <ReactApexChart
                options={state.options}
                series={barSeries}
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