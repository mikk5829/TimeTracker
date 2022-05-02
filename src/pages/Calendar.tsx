import * as React from 'react';
import {Button, Typography} from "@mui/material";
import {Actions, Category, Event, useDispatch, useTrackedState} from "../service/data";
import FullCalendar from '@fullcalendar/react' // https://fullcalendar.io/docs/react
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import {useSnackbar} from "notistack";
import BasicDateTimePicker from "../components/BasicDateTimePicker";

// https://codesandbox.io/s/82fi9?file=/src/index.tsx
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Moment from "react-moment";
import {useCallback, useRef, useState} from "react";

// must create a class i guess
class calendar {
}

export default function Calendar(this: any) {
    const {categories, categoryNames, events, error} = useTrackedState();
    const [openAddTimeDialog, setOpenAddTimeDialog] = useState(false)
    const [startTime, setStartTime] = React.useState<Date | null>(new Date());
    const [endTime, setEndTime] = React.useState<Date | null>(new Date());
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // create calendars per each Category
    const calendars: ICalendarInfo[] =
        categories?.map((category: Category) => {
            return ({
                id: category.id,
                name: category.name,
                // insert color mapping per category
                color: "#ffffff", //font color
                bgColor: "#94132B",
                dragBgColor: "#FF7B7F",
                borderColor: "#CA4A53"
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
            //body: You spent XX time doing YY
            start: event.startTime,
            end: event.endTime
        })
    })


    // handle changing timeframes
    const cal = useRef(null);
    const handleMonthClick = useCallback(() => {
        // @ts-ignore
        cal.current.calendarInst.changeView("month")
    }, []);

    const handleWeekClick = useCallback(() => {
        this.current.calendarInst.changeView("week")
    }, []);

    const handleDayClick = useCallback(() => {
       this.current.calendarInst.changeView("day")
    }, []);

    // handle prev/next -- not working!
    const handleClickNextButton = () => {
        const calendarInstance = this.current.getInstance();
        calendarInstance.next();
    };

    const handleClickPrevButton = () => {
        const calendarInstance = this.current.getInstance();
        calendarInstance.prev();
    };


    return (
        <div>
            <Typography color={"secondary"} variant={"h4"}>Event calendar</Typography>
            <Button variant={"contained"} color="primary" onClick={handleMonthClick}>
                Month
            </Button>
            <Button variant={"contained"} color="primary" onClick={handleWeekClick}>
                Week
            </Button>
            <Button variant={"contained"} color="primary" onClick={handleDayClick}>
                Day
            </Button>
            <Button variant={'contained'} color = "secondary" onClick={handleClickPrevButton}>&lt;</Button>
            <Button variant={'contained'} color = "secondary" onClick={handleClickNextButton}>&gt;</Button>
            <TUICalendar

                //ref={calendarRef}
                height={"auto"}
                view = "week"
                schedules={schedules}
                calendars={calendars}
                week={{
                    startDayOfWeek: 1
                }}
                month={{
                    startDayOfWeek: 1,
                }}
                taskView={false}
                // template={{
                //     weekDayname: weekDayname
                // }}
                useDetailPopup={true}
                useCreationPopup={true}
            />
        </div>
    );
}

{/*<FullCalendar*/}
{/*    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}*/}
{/*    headerToolbar={{*/}
{/*        left: 'prev,next today',*/}
{/*        center: 'title',*/}
{/*        right: 'dayGridMonth,timeGridWeek,timeGridDay'*/}
{/*    }}*/}
{/*    initialView="dayGridMonth"*/}
{/*    editable={true}*/}
{/*    selectable={true}*/}
{/*    selectMirror={true}*/}
{/*    dayMaxEvents={true}*/}
{/*    //contentHeight={"auto"}*/}
{/*    stickyHeaderDates={true}*/}
{/*    height={"auto"} // ???? what to do?*/}
{/*    events={arrayOfObjects}*/}
{/*    //testing deleting/adding events*/}
{/*    eventClick={handleEventClick} // deleting event*/}
{/*    // select={handleDateSelect} // adding event*/}
{/*/>*/}

// const arrayOfObjects = events?.map((event: Event) => {
//     return ({
//         title: categoryNames[event.categoryId],
//         start: event.startTime,
//         end: event.endTime
//     })
// })

// allow deleting events from the calendar
// // (should we only do this on a long click? what if people want to see more info on what they did..??
// let handleEventClick = (clickInfo: { event: { title: any; remove: () => void; }; }) => {
//     // eslint-disable-next-line no-restricted-globals
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
//          dispatch({type: Actions.DeleteEvent, id: events.id})}}
//         //clickInfo.event.remove()
//         // UPDATE THIS TO HAVE THE RIGHT EVENT ID AND CALL DISPATCH
//
//
//
// function createEventId() {
//
// }

// allow adding events on the calendar
// let handleDateSelect = (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar
//
//     calendarApi.unselect() // clear date selection
//
//     if (title) {
//         calendarApi.addEvent({
//             id: createEventId(),
//             title,
//             start: selectInfo.startStr,
//             end: selectInfo.endStr,
//             allDay: selectInfo.allDay
//         })
//     }
// }