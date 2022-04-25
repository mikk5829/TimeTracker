import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {usePersistReducer, Event, Category} from "../service/data";
import moment from "moment";


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {

    const [{categories, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    // FOR STORING TOTAL HOURS SPENT
    let totalSeries: { name: string, data: number[] }[] = [{name: "abc", data: []}];
    let totalXLabels: string[] = [];

    // FOR STORING MONTHLY TIME SPENT
    let monthlyXLabels: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthlySeries: { name: string, data: number[] }[] = [];

    // FOR STORING WEEKLY TIME SPENT
    let weeklyXLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let weeklySeries: { name: string, data: number[] }[] = [];

    let idxs: { id: string, index: number }[] = [];
    let i = 0;

    events.forEach((event: Event) => {

        let id = event.categoryId;

        totalXLabels.push(id);
        let startTime = moment(event.startTime);
        let endTime = moment(event.endTime);

        let weekday = startTime.day();
        let date = startTime.date(); // 1-based (first day of month = 1)
        let month = startTime.month(); // 0-based (jan=0, dec=11)
        let year = startTime.month();

        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();


        var match_total = idxs.find(x => x.id == id);
        var match_month = monthlySeries.find(x => x.name == id);
        var match_week = weeklySeries.find(x => x.name == id);

        var idx = -1;

        // For total time spent
        if (match_total == undefined) {
            idxs.push({
                id: id,
                index: i
            });
            totalSeries[0].data.push(hours);
            i++;
        } else {
            idx = match_total.index;
            totalSeries[0].data[idx] += hours;
        }

        // For monthly time spent
        if (match_month == undefined) {
            monthlySeries.push({
                data: new Array(12).fill(0),
                name: id
            });
        } else {
            match_month.data[month] += hours;
        }

        // For weekly time spent
        if (match_week == undefined) {
            weeklySeries.push({
                data: new Array(7).fill(0),
                name: id
            });
        } else {
            match_week.data[weekday] += hours;
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
                text: 'Time logged in total per category',
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

    const stateMonthlyTime = {
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
                categories: monthlyXLabels,
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
                text: 'Time logged per month per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: 'black'
                }
            }
        },
        series: monthlySeries
    };

    const stateWeeklyTime = {
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
                categories: weeklyXLabels,
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
                text: 'Time logged per weekday per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: 'black'
                }
            }
        },
        series: weeklySeries
    };

    return (
        <div>
            <Typography variant={"h1"}>Trends</Typography>

            <ReactApexChart
                type="bar"
                options={stateTotalTime.options}
                series={stateTotalTime.series}
                height="350"
                width="100%"
            />

            <ReactApexChart
                type="bar"
                options={stateMonthlyTime.options}
                series={stateMonthlyTime.series}
                width="100%"
                height="350"
            />
            <ReactApexChart
                type="bar"
                options={stateWeeklyTime.options}
                series={stateWeeklyTime.series}
                width="100%"
                height="350"
            />
        </div>
    );
}