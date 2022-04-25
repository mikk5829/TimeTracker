import * as React from 'react';
import {Stack, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Event, usePersistReducer} from "../service/data";
import TLItem from "../components/TLItem";
import FullCalendar, { formatDate } from '@fullcalendar/react' // https://fullcalendar.io/docs/react
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx

export default function Calendar() {

    const [{categoryNames, events}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    const arrayOfObjects = [
        { title: "Americano", date: "2022-04-22" },
        { title: "Espresso", date: "2022-04-23" },
        { title: "Americano", date: "2022-04-22" },
        { title: "Espresso", date: "2022-04-23" }
    ]

    // const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

    return (
        <div>
            <Typography color = {"secondary"} variant={"h4"}>Event calendar</Typography>
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
                events= {arrayOfObjects}
            />

        {/*<Typography variant={"h2"}>Timeline basic view demo</Typography>*/}
        {/*    <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
        {/*        <DatePicker*/}
        {/*            label="Select date"*/}
        {/*            value={dateValue}*/}
        {/*            onChange={(newValue) => {*/}
        {/*                setDateValue(newValue);*/}
        {/*            }}*/}
        {/*            renderInput={(params) => <TextField {...params} />}*/}
        {/*        />*/}
        {/*    </LocalizationProvider>*/}

        {/*    /!*<Typography variant = {"h3"}>try actually accessing the data</Typography>*!/*/}
        {/*    {events?.map((event: Event) => {*/}
        {/*        return <TLItem event={event} eventName={categoryNames[event.categoryId]} />*/}
        {/*    })}*/}


        </div>
);
}
// https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx