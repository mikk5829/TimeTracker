import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {usePersistReducer, Event, Category} from "../service/data";
import moment, {Moment} from "moment";


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {

    const [{categories, events, error, categoryNames}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    // FOR STORING TOTAL HOURS SPENT
    let totalSeries: { name: string, data: number[] }[] = [{name: "Total time", data: []}];
    let totalXLabels: string[] = [];

    // FOR STORING MONTHLY TIME SPENT
    let monthlyXLabels: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthlySeries: { name: string, data: number[] }[] = [];

    // FOR STORING WEEKLY TIME SPENT
    let weeklyXLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let weeklySeries: { name: string, data: number[] }[] = [];

    let timelineSeries: { name: string, data: any[] }[] = [];

    let idxs: { name: string, index: number }[] = [];
    let i = 0;

    events.forEach((event: Event) => {

        let id = event.categoryId;

        let startTime = moment(event.startTime);
        let endTime = moment(event.endTime);

        let weekday = startTime.isoWeekday() - 1;
        let date = startTime.date(); // 1-based (first day of month = 1)

        let month = startTime.month(); // 0-based (jan=0, dec=11)
        let year = startTime.month();

        let millisDate = startTime.clone().startOf('day').valueOf()

        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();


        var match_total = idxs.find(x => x.name === categoryNames[id]);
        var match_month = monthlySeries.find(x => x.name === categoryNames[id]);
        var match_week = weeklySeries.find(x => x.name === categoryNames[id]);

        var match_timeline = timelineSeries.find(x => x.name === categoryNames[id]);


        var idx = -1;

        // For total time spent
        if (match_total === undefined) {
            idxs.push({
                name: categoryNames[id],
                index: i
            });

            totalXLabels.push(categoryNames[id]);
            totalSeries[0].data.push(hours);
            i++;
        } else {
            idx = match_total.index;
            totalSeries[0].data[idx] += hours;
        }

        // For monthly time spent
        if (match_month === undefined) {
            monthlySeries.push({
                data: new Array(12).fill(0),
                name: categoryNames[id]
            });
            monthlySeries[monthlySeries.length - 1].data[month] += hours;
        } else {
            match_month.data[month] += hours;
        }

        // For weekly time spent
        if (match_week === undefined) {
            weeklySeries.push({
                data: new Array(7).fill(0),
                name: categoryNames[id]
            });
            weeklySeries[weeklySeries.length - 1].data[weekday] += hours;
        } else {
            match_week.data[weekday] += hours;
        }

        // For timeline view
        if (match_timeline === undefined) {
            timelineSeries.push({
                data: [[millisDate, hours]],
                name: categoryNames[id]
            });
        } else {
            let match_date = match_timeline.data.find(x => x[0] === millisDate);
            if (match_date === undefined) {
                match_timeline.data.push([millisDate, hours]);
            } else {
                match_date[1] += hours;
            }
        }

        /*
        // For timeline view
        if (match_timeline === undefined) {
            timelineSeries.push({
                data: [moment(event.startTime).clone().startOf('day').toDate()],
                name: categoryNames[id]
            });
        } else {
            match_timeline.data.push(moment(event.startTime).clone().startOf('day').toDate());
        }*/
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
                },
                labels: {
                    formatter: function (num: number) {
                        return num.toFixed(3)
                    }
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
                },
                labels: {
                    formatter: function (num: number) {
                        return num.toFixed(3)
                    }
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
                },
                labels: {
                    formatter: function (num: number) {
                        return num.toFixed(3)
                    }
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

    const stateTimeline = {
        options: {
            chart: {
                id: "basic-bar"
            },
            plotOptions: {
                bar: {
                    borderRadius: 2
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                title: {
                    text: "Date"
                },
                labels: {
                    formatter: function (millis: string) {
                        return moment(millis).format("DD MMM YYYY");
                    }
                }
            },
            yaxis: {
                title: {
                    text: "Hours"
                },
                labels: {
                    formatter: function (num: number) {
                        return num.toFixed(3)
                    }
                }
            },
            title: {
                text: 'Historical overview',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: 'black'
                }
            }
        },
        series: timelineSeries
    };

    return (
        <div>
            <Typography color={"secondary"} variant={"h4"}>Trends</Typography>


            <ReactApexChart
                type="line"
                options={stateTimeline.options}
                series={stateTimeline.series}
                width="100%"
                height="350"
            />

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