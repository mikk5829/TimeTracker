import * as React from 'react';
import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {Event, Category, Actions, useDispatch, useTrackedState} from "../service/data";
import moment from "moment";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {theme} from '../service/theme'


// code example for choosing from day, week, month views https://codesandbox.io/s/react-apex-charts-m9tww?file=/src/index.js
export const isString = (item: any): item is string => {
    return typeof item === "string";
};

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export default function Trends() {
    const dispatch = useDispatch();
    const {categoryNames, categoryColors, events, error} = useTrackedState();
    const {enqueueSnackbar} = useSnackbar();
    const HOURSTOMILLISFACTOR = 1000 * 60 * 60
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
    let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthlyXLabels: string[] = [];
    let today = new Date();
    let d: Date;
    let month: string;

    for(let i = 5; i >= 0; i--) {
        d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        month = months[d.getMonth()];
        monthlyXLabels.push(month);
    }

    let monthlySeries: { name: string, data: number[] }[] = [];

    let initHeatmapSeries: { name: string, data: { x: number, y: number }[] }[] = [];

    for (let i = 0; i < months.length; i++) {
        initHeatmapSeries.push({
            name: months[i],
            data: []
        });

        for (let day = 1; day <= 31; day++) {
            initHeatmapSeries[i].data.push({
                x: day,
                y: Math.random() * 0 * HOURSTOMILLISFACTOR
            });
        }
    }
    const [heatmapSeries, setHeatmapSeries] = useState(initHeatmapSeries);

    // FOR STORING WEEKLY TIME SPENT
    let weeklyXLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let weeklySeries: { name: string, data: number[] }[] = [];

    let timelineSeries: { name: string, data: any[] }[] = [];

    let idxs: { name: string, index: number }[] = [];
    let i = 0;

    let eventsUniqueIds: string[] = Array.from(new Set(events.map((event: Event) => event.categoryId)));
    //let colors = Array.from(new Set(events.map((event: Event) => "#" + categoryColors[event.categoryId].hex)).values());
    let colors: string[] = []; // = Array.from(eventsUniqueIds.map((id: string) => "#" + categoryColors[id].hex))

    eventsUniqueIds.forEach((id: string) => {
        if (id in categoryColors) {
            colors.push('#' + categoryColors[id].hex);
        } else {
            colors.push('#FFFFFF'); // Default color
        }
    });

    console.log(colors);

    events.forEach((event: Event) => {

        let id = event.categoryId;

        let startTime = moment(event.startTime);
        let endTime = moment(event.endTime);

        let weekday = startTime.isoWeekday() - 1;
        let date = startTime.date(); // 1-based (first day of month = 1)

        let month = startTime.month();
        let month_string = startTime.format("MMMM");
        let year = startTime.year();

        let millisDate = startTime.clone().startOf('day').valueOf()

        var duration = moment.duration(endTime.diff(startTime)).asMilliseconds();
        //var hours = duration.asHours();
        var hours = duration;


        var match_total = idxs.find(x => x.name === categoryNames[id]);
        var match_month = monthlySeries.find(x => x.name === categoryNames[id]);
        var match_week = weeklySeries.find(x => x.name === categoryNames[id]);

        var match_timeline = timelineSeries.find(x => x.name === categoryNames[id]);

        let minyear = today.getFullYear();
        if ((today.getMonth() - 5) < 0) {
            minyear -= 1;
        }

        var idx = -1;

        // For total time spent
        if (match_total === undefined) {
            idxs.push({
                name: categoryNames[id],
                index: i
            });
            totalXLabels.push(categoryNames[id]);
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
        if (match_month === undefined && year >= minyear && monthlyXLabels.includes(month_string)) {
            monthlySeries.push({
                data: new Array(12).fill(0),
                name: categoryNames[id]
            });
            monthlySeries[monthlySeries.length - 1].data[month] = hours;
        } else if (match_month !== undefined && year >= minyear && monthlyXLabels.includes(month_string)) {
            match_month.data[month] += hours;
        }

        // For weekly time spent
        if (match_week === undefined) {
            weeklySeries.push({
                data: new Array(7).fill(0),
                name: categoryNames[id]
            });
            weeklySeries[weeklySeries.length - 1].data[weekday] = hours;
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
    });

    for (let i = 0; i < monthlySeries.length; i++) {
        let newData = [];

        for (let j = mod((new Date().getMonth() - 6), 12);;j++) {
            if (j===12) {
                j = 0;
            }

            if (monthlyXLabels.includes(months[j])) {
                newData.push(monthlySeries[i].data[j])
            }

            if (j === new Date().getMonth()) {
                break;
            }
        }
        monthlySeries[i].data = newData;
    }

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
            },
            colors: colors
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
            },
            colors: colors
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
            },
            colors: colors
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
            },
            colors: colors
        },
        series: timelineSeries
    };

    const stateHeatmap = {
        options: {
            tooltip: {
                y: {
                    formatter: (millis: number) => {
                        return msToTime(millis);
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 100],
                    colorStops: []
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                overwriteCategories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                title: {
                    text: "Date"
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
                    text: "Month"
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            },
            colors: [theme.palette.primary.main],
            title: {
                text: 'Calendar heatmap',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.primary.main
                }
            }
        },
        series: heatmapSeries
    };

    function computeHeatmap(category: string) {

        let heatmapSeries: { name: string, data: { x: number, y: number }[] }[] = [];

        for (let i = 0; i < months.length; i++) {
            heatmapSeries.push({
                name: months[i],
                data: []
            });

            for (let day = 1; day <= 31; day++) {
                heatmapSeries[i].data.push({
                    x: day,
                    y: Math.random() * 0 * HOURSTOMILLISFACTOR
                });
            }
        }

        events.forEach((event: Event) => {
            let id = event.categoryId;

            let startTime = moment(event.startTime);
            let endTime = moment(event.endTime);

            let date = startTime.date(); // 1-based (first day of month = 1)

            let month_string = startTime.format("MMMM");

            var duration = moment.duration(endTime.diff(startTime)).asMilliseconds();
            var hours = duration;

            // For heatmap
            if (categoryNames[id] == category) {
                let match = heatmapSeries.find(x => x.name === month_string);
                if (match === undefined) {
                    console.log("aaaaaaaaaaaaaaaaaaa heatmap bug")
                } else {
                    match.data[date - 1].y += hours;
                }
            }
        });

        setHeatmapSeries(heatmapSeries);
        //stateHeatmap.series = heatmapSeries;
    }

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

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Array.from(new Set(events.map((event: Event) => categoryNames[event.categoryId])).values())}
                sx={{width: 300}}
                onChange={(event, value) => {
                    computeHeatmap(isString(value) ? value : "")

                }}
                renderInput={(params) => <TextField {...params} label="Select category"/>}
            />

            <ReactApexChart
                type="heatmap"
                options={stateHeatmap.options}
                series={stateHeatmap.series}
                height="350"
            />
        </div>
    );
}