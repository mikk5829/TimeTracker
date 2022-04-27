import * as React from 'react';
import {Typography} from "@mui/material";
import {Event, useTrackedState} from "../service/data";
import FullCalendar from '@fullcalendar/react' // https://fullcalendar.io/docs/react
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import {useSnackbar} from "notistack";
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx


export default function Calendar() {
    const {categories, categoryNames, events, error} = useTrackedState();
    const {enqueueSnackbar} = useSnackbar();
    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error, {variant: "error"})
    //         dispatch({type: Actions.DismissError})
    //     }
    // }, [error])

    const arrayOfObjects = events?.map((event: Event) => {
        return ({
            title: categoryNames[event.categoryId],
            start: event.startTime,
            end: event.endTime
        })
    })

    // allow deleting events from the calendar
    // (should we only do this on a long click? what if people want to see more info on what they did..??
    let handleEventClick = (clickInfo: { event: { title: any; remove: () => void; }; }) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
            clickInfo.event.remove()
            // UPDATE THIS TO HAVE THE RIGHT EVENT ID AND CALL DISPATCH
        }
    }

    function createEventId() {

    }

    // allow adding events on the calendar
    let handleDateSelect = (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }


    return (
        <div>
            <Typography color={"secondary"} variant={"h4"}>Event calendar</Typography>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                //contentHeight={"auto"}
                stickyHeaderDates={true}
                height={"auto"} // ???? what to do?
                events={arrayOfObjects}
                //testing deleting/adding events
                eventClick={handleEventClick} // deleting event
                select={handleDateSelect} // adding event
            />


        </div>
    );


}
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx