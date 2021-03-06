import * as React from 'react';
import {createRef, useCallback, useEffect, useRef, useState} from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import {Category, Event, useDispatch, useTrackedState} from "../service/data";
import {useSnackbar} from "notistack";
import {theme} from '../service/theme'
import {calTheme} from "../service/calTheme";

// https://codesandbox.io/s/82fi9?file=/src/index.tsx
import Calendar from '@toast-ui/react-calendar';
import {ICalendarInfo, ISchedule} from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import SettingsIcon from "@mui/icons-material/Settings";
import {ArrowCircleLeft, ArrowCircleRight, ArrowLeft} from "@mui/icons-material";

export default function CalendarView(this: any) {
    const {categories, categoryNames, events} = useTrackedState();
    const [heading, setHeading] = useState('')
    let calendarRef = useRef(null);

    // create calendars per each Category
    const calendars: ICalendarInfo[] =
        categories?.map((category: Category) => {
            return ({
                id: category.id,
                name: category.name,
                // insert color mapping per category
                color: "#ffffff", //font color
                bgColor: "#" + category.color.hex,
                dragBgColor: "#" + category.color.hex,
                borderColor: "#" + category.color.hex,
                fontFamily: theme.typography.fontFamily
            })
        })

    // create schedules: this is where we take our event history and link to the above calendar.
    const schedules: ISchedule[] = events?.map((event: Event) => {
        return ({
            calendarId: event.categoryId,
            category: "time",
            isVisible: true,
            title: categoryNames[event.categoryId],
            id: event.categoryId,
            start: event.startTime,
            end: event.endTime
        })
    })

    // handle changing timeframes
    const handleChangeViewClick = (view: string) => {
        // @ts-ignore
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.changeView(view);
        setRenderRangeText()
    }

    // handle prev/next
    const handleClickNextButton = () => {
        // @ts-ignore
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.next();
        setRenderRangeText()
    };

    const handleClickPrevButton = () => {
        // @ts-ignore
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.prev();
        setRenderRangeText()
    };

    useEffect((() => setRenderRangeText()), [])

    function setRenderRangeText() {
        // @ts-ignore
        const calendarInst = calendarRef.current.getInstance()
        const view = calendarInst.getViewName();
        const calDate = calendarInst.getDate();
        const rangeStart = calendarInst.getDateRangeStart();
        const rangeEnd = calendarInst.getDateRangeEnd();
        let year = calDate.getFullYear();
        let month = calDate.getMonth() + 1;
        let date = calDate.getDate();
        let dateRangeText = "";
        let endMonth, endDate, start, end;

        switch (view) {
            case "month":
                dateRangeText = `${month}-${year}`;
                break;
            case "week":
                year = rangeStart.getFullYear();
                month = rangeStart.getMonth() + 1;
                date = rangeStart.getDate();
                endMonth = rangeEnd.getMonth() + 1;
                endDate = rangeEnd.getDate();

                start = `${
                    date < 10 ? "0" : ""
                }${date}-${month < 10 ? "0" : ""}${month}-${year}`;
                end = `${
                    endDate < 10 ? "0" : ""
                }${endDate}-${endMonth < 10 ? "0" : ""}${endMonth}-${year}`;
                dateRangeText = `${start} ~ ${end}`;
                break;
            default:
                dateRangeText = `${date}-${month}-${year}`;
        }
        setHeading(dateRangeText)
    }


    return (
        <div>
            <Typography color={"secondary"} variant={"h4"} fontFamily={"Epilogue"}>Event calendar</Typography>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center">
                <IconButton color="secondary" onClick={handleClickPrevButton}>
                    <ArrowCircleLeft/>
                </IconButton>
                {/*<Button variant={'contained'} color="secondary" onClick={handleClickPrevButton}>&lt;</Button>*/}
                <Stack direction="row"
                       justifyContent="center"
                       alignItems="center"
                >
                    <Button variant={"contained"} color="primary" onClick={() => handleChangeViewClick('month')}>
                        Month
                    </Button>
                    <Button variant={"contained"} color="primary" onClick={() => handleChangeViewClick('week')}>
                        Week
                    </Button>
                    <Button variant={"contained"} color="primary" onClick={() => handleChangeViewClick('day')}>
                        Day
                    </Button>
                </Stack>
                <IconButton color="secondary" onClick={handleClickNextButton}>
                    <ArrowCircleRight/>
                </IconButton>
            </Stack>
            <Stack direction="row"
                   justifyContent="center"
                   alignItems="center"><Typography>{heading}</Typography></Stack>
            <Calendar
                ref={calendarRef}
                height="100%"
                calendars={calendars}
                disableDblClick={true}
                disableClick={true}
                isReadOnly={true}
                month={{
                    startDayOfWeek: 1
                }}
                schedules={schedules}
                scheduleView
                taskView={false}
                theme={calTheme}
                useDetailPopup
                useCreationPopup
                view={"week"} // You can also set the `defaultView` option.
                week={{
                    showTimezoneCollapseButton: true,
                    timezonesCollapsed: true,
                    startDayOfWeek: 1
                }}
            />
        </div>
    );
}
