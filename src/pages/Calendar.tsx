import * as React from 'react';
import {Typography} from "@mui/material";
import {Actions, Event, useDispatch, useTrackedState} from "../service/data";
import FullCalendar from '@fullcalendar/react' // https://fullcalendar.io/docs/react
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import {useSnackbar} from "notistack";

// https://codesandbox.io/s/82fi9?file=/src/index.tsx
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";


export default function Calendar() {
    const {categories, categoryNames, events, error} = useTrackedState();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

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


    // create calendars: this is for "personal", "work", etc. Start with just "my calendar"
    const calendars: ICalendarInfo[] = [
        {
            id: "1",
            name: "My Calendar",
            color: "#ffffff", //font color
            bgColor: "#94132B",
            dragBgColor: "#5B6D82",
            borderColor: "#CA4A53"
        }
    ];

    // create schedules: this is where we take our event history and link to the above calendar.
    const schedules: ISchedule[] = events?.map((event: Event) => {
        return ({
            calendarId: "1",
            category: "time",
            isVisible: true,
            title: categoryNames[event.categoryId],
            id: event.categoryId,
            //body: "Test",
            start: event.startTime,
            end: event.endTime
        })
    })

    // handle prev/next
    let calendarRef = React.createRef();

    const weekDayname = (model: { dayName: any; date: any; }) => {
        return `
        <div className="day-name">${model.dayName}</div>
        <div className="day-number">${model.date}</div>
      `;
    };

    const handleClickNextButton = () => {
        // @ts-ignore
        const calendarInstance = calendarRef.current.getInstance();

        calendarInstance.next();
    };

    const handleClickPrevButton = () => {
        // @ts-ignore
        const calendarInstance = calendarRef.current.getInstance();

        calendarInstance.prev();
    };


    return (
        <div>
            <Typography color={"secondary"} variant={"h4"}>Event calendar</Typography>
            <button onClick={handleClickPrevButton}>prev</button>
            <button onClick={handleClickNextButton}>next</button>
            <TUICalendar
                //ref={calendarRef}
                height={"auto"}
                view = "week"
                schedules={schedules}
                calendars={calendars}
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