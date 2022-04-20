import * as React from 'react';
import {Paper, Stack, Typography} from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import BedIcon from '@mui/icons-material/Bed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Actions, Category, Event, usePersistReducer} from "../service/data";
import EventItem from "../components/EventItem";
import TLItem from "../components/TLItem";

// import EventItem from "../components/EventItem";
// import {Event, Category} from "../service/data";

// type CalendarProps = { event: Event} // , category: Category }


export default function Calendar() {

    const [{categories, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

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

    {/*        <Typography variant = {"h3"}> hard-coded data example</Typography>*/}

    {/*        <Stack*/}
    {/*            direction="column"*/}
    {/*            justifyContent="space-between"*/}
    {/*            alignItems="left"*/}
    {/*            spacing={0}>*/}
    {/*            /!*{events?.map((event: Event) => {*!/*/}
    {/*            /!*    return <EventItem event={event}/> // stack all the user's events*!/*/}
    {/*            /!*})}*!/*/}

    {/*        </Stack>*/}
    {/*        <React.Fragment>*/}
    {/*            <Typography variant={"h3"} align ={"center"}>Today</Typography>*/}
    {/*    <Timeline position="right">*/}
    {/*        <TimelineItem>*/}
    {/*            <TimelineOppositeContent*/}
    {/*                sx={{ m: 'auto 0' }}*/}
    {/*                align="right"*/}
    {/*                variant="body2"*/}
    {/*                color="text.secondary">*/}
    {/*                9:30 am*/}
    {/*            </TimelineOppositeContent>*/}
    {/*            <TimelineSeparator>*/}
    {/*                <TimelineConnector />*/}
    {/*                <TimelineDot color = "secondary">*/}
    {/*                </TimelineDot>*/}
    {/*                <TimelineConnector />*/}
    {/*            </TimelineSeparator>*/}
    {/*            <TimelineContent sx={{ py: '12px', px: 2 }}>*/}
    {/*                <Typography variant="h3" component="span">*/}
    {/*                    Exercise*/}
    {/*                </Typography>*/}
    {/*                <Typography>30 min</Typography>*/}
    {/*            </TimelineContent>*/}
    {/*        </TimelineItem>*/}

    {/*        <TimelineItem>*/}
    {/*            <TimelineOppositeContent*/}
    {/*                sx={{ m: 'auto 0' }}*/}
    {/*                variant="body2"*/}
    {/*                color="text.secondary">*/}
    {/*                10:00 am*/}
    {/*            </TimelineOppositeContent>*/}
    {/*            <TimelineSeparator>*/}
    {/*                <TimelineConnector />*/}
    {/*                <TimelineDot color="primary">*/}
    {/*                </TimelineDot>*/}
    {/*                <TimelineConnector />*/}
    {/*            </TimelineSeparator>*/}
    {/*            <TimelineContent sx={{ py: '12px', px: 2 }}>*/}
    {/*                <Typography variant="h3" component="span">*/}
    {/*                    Reading*/}
    {/*                </Typography>*/}
    {/*                <Typography>45 min</Typography>*/}
    {/*            </TimelineContent>*/}
    {/*        </TimelineItem>*/}
    {/*        <TimelineItem>*/}
    {/*            <TimelineOppositeContent*/}
    {/*                sx={{ m: 'auto 0' }}*/}
    {/*                align="right"*/}
    {/*                variant="body2"*/}
    {/*                color="text.secondary">*/}
    {/*                11:30 am*/}
    {/*            </TimelineOppositeContent>*/}
    {/*            <TimelineSeparator>*/}
    {/*                <TimelineConnector />*/}
    {/*                <TimelineDot color = "secondary">  /!*color="secondary" variant="outlined">*!/*/}
    {/*                </TimelineDot>*/}
    {/*                <TimelineConnector/>  /!*sx={{ bgcolor: 'secondary.main' }} /> *!/*/}
    {/*            </TimelineSeparator>*/}
    {/*            <TimelineContent sx={{ py: '12px', px: 2 }}>*/}
    {/*                <Typography variant="h3" component="span">*/}
    {/*                    Schoolwork*/}
    {/*                </Typography>*/}
    {/*                <Typography>1 h 45 m</Typography>*/}
    {/*            </TimelineContent>*/}
    {/*        </TimelineItem>*/}

    {/*        <TimelineItem>*/}
    {/*            <TimelineOppositeContent*/}
    {/*                sx={{ m: 'auto 0' }}*/}
    {/*                align="right"*/}
    {/*                variant="body2"*/}
    {/*                color="text.secondary">*/}
    {/*                1:30 pm*/}
    {/*            </TimelineOppositeContent>*/}
    {/*            <TimelineSeparator>*/}
    {/*                <TimelineConnector/>*/}
    {/*                <TimelineDot color="primary">*/}
    {/*                </TimelineDot>*/}
    {/*                <TimelineConnector />*/}
    {/*            </TimelineSeparator>*/}
    {/*            <TimelineContent sx={{ py: '12px', px: 2 }}>*/}
    {/*                <Typography variant="h3" component="span">*/}
    {/*                    Video games*/}
    {/*                </Typography>*/}
    {/*                <Typography>3 h 45 m</Typography>*/}
    {/*            </TimelineContent>*/}
    {/*        </TimelineItem>*/}
    {/*    </Timeline>*/}
    {/*</React.Fragment>*/}

            {/*<Typography variant = {"h3"}>try actually accessing the data</Typography>*/}
            {events?.map((event: Event) => {
                return <TLItem event={event}/>
            })}


        </div>
);
}