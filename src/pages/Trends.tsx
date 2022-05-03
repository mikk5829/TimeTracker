import * as React from 'react';
import {Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {Event, Category, Actions, useDispatch, useTrackedState} from "../service/data";
import moment from "moment";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {theme} from '../service/theme'


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js

export default function Trends() {
    const dispatch = useDispatch();
    const {categoryNames, events, error} = useTrackedState();
    const {enqueueSnackbar} = useSnackbar();
    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error, {variant: "error"})
    //         dispatch({type: Actions.DismissError})
    //     }
    // }, [error])
    // FOR STORING TOTAL HOURS SPENT
    let totalSeries: { name: string, data: (number | null)[] }[] = [];
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

        var duration = moment.duration(endTime.diff(startTime)).asMilliseconds();
        //var hours = duration.asHours();
        var hours = duration;


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

            for (let j = 0; j < totalSeries.length; j++) {
                break;
                totalSeries[j].data.push(null);
            }

            var arr = new Array(i).fill(null);
            arr.push(hours);
            totalSeries.push({
                data: [hours],
                name: categoryNames[id]
            });
            i++;
        } else {
            idx = match_total.index;
            totalSeries[idx].data[0]! += hours!;
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

    for (let i = 0; i < timelineSeries.length; i++) {
        timelineSeries[i].data.sort(function (x, y) {
            return x[0] - y[0];
        });
    }

    function msToTime(duration: number) {
        var milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        var hours_str = (hours < 10) ? "0" + hours : hours;
        var minutes_str = (minutes < 10) ? "0" + minutes : minutes;
        var seconds_str = (seconds < 10) ? "0" + seconds : seconds;
        console.log(hours_str + ":" + minutes_str + ":" + seconds_str);
        console.log(duration);
        return hours_str + ":" + minutes_str;
    }

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
                },
                labels: {
                    formatter: function (value: string) {
                        return "";
                    }
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            yaxis: {
                title: {
                    text: "Duration"
                },
                labels: {
                    formatter: msToTime
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            title: {
                text: 'Time logged in total per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
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
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            yaxis: {
                title: {
                    text: "Duration"
                },
                labels: {
                    formatter: msToTime
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            title: {
                text: 'Time logged per month per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
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
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            yaxis: {
                title: {
                    text: "Duration"
                },
                labels: {
                    formatter: msToTime
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            title: {
                text: 'Time logged per weekday per category',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
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

                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            yaxis: {
                title: {
                    text: "Duration"
                },
                labels: {
                    formatter: msToTime
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            title: {
                text: 'Historical overview',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
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