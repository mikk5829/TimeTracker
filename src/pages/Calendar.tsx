import * as React from 'react';
import {Stack, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Event, usePersistReducer} from "../service/data";
import TLItem from "../components/TLItem";

export default function Calendar() {

    const [{categories, categoryNames, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    // Set the date picker at the top - default to today
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

    return (
        <div>
        <Typography variant={"h2"}>Timeline basic view demo</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Select date"
                    value={dateValue}
                    onChange={(newValue) => {
                        setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {/*<Typography variant = {"h3"}>try actually accessing the data</Typography>*/}
            {events?.map((event: Event) => {
                return <TLItem event={event} eventName={categoryNames[event.categoryId]} />
            })}


        </div>
);
}