import * as React from 'react';
import {Typography} from "@mui/material";
import {Event, usePersistReducer} from "../service/data";
import FullCalendar from '@fullcalendar/react' // https://fullcalendar.io/docs/react
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx

export default function Calendar() {

    const [{categoryNames, events}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    const arrayOfObjects = events?.map((event: Event) => {
        return ({
            title: categoryNames[event.categoryId],
            start: event.startTime,
            end: event.endTime
        })
    })

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
                events={arrayOfObjects}
            />
        </div>
    );
}
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx