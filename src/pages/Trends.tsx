import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {usePersistReducer, Event, Category} from "../service/data";
import moment from "moment";


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {

    const [{categories, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    let totalSeries: { name: string, type: string, data: number[] }[] = [{name: "abc", type: "column", data: []}];
    let totalXLabels: string[] = [];

    let idxs: {id: string, index: number}[] = [];
    let i = 0;

    events.forEach((event: Event) => {

        let id = event.categoryId;

        totalXLabels.push(event.categoryId);

        var duration = moment.duration(moment(event.endTime).diff(event.startTime));
        var hours = duration.asHours();


        var match_index = idxs.find(x => x.id == id);

        var idx = -1;

        if (match_index == undefined) {
            idxs.push({
                id: id,
                index: i
            });
            totalSeries[0].data.push(hours);
            i++;
        } else {
            idx = match_index.index;
            totalSeries[0].data[idx] += hours;
        }
    });

    console.log(totalSeries);

    const stateTotalTime = {
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
                categories: totalXLabels,
                title: {
                    text: "Category"
                }
            },
            yaxis: {
                title: {
                    text: "Hours"
                }
            },
            title: {
                text: 'Total time logged per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: 'black'
                }
            }
        },
        series: totalSeries
    };

    return (
        <div>
            <Typography variant={"h1"}>Trends</Typography>

            <ReactApexChart
                options={stateTotalTime.options}
                series={stateTotalTime.series}
                type="bar"
                height="350"
                width="100%"
            />

            <ReactApexChart
                type="line"
                options={stateTotalTime.options}
                series={stateTotalTime.series}
                width="100%"
                height="350"
            />
            <ReactApexChart
                type="area"
                options={stateTotalTime.options}
                series={stateTotalTime.series}
                width="100%"
                height="350"
            />
        </div>
    );
}