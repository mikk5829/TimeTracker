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

// could this be used? https://reactjsexample.com/a-calendar-timetable-for-react-native/
// or should we just use Timeline from Mui? https://mui.com/components/timeline/
// if we do timeline, we can do experiments on type/format of timeline

export default function Calendar() {

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
        <Stack>
            <Typography variant={"h3"} align ={"center"}>Monday 4 April</Typography>
    <React.Fragment>
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    09:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="secondary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Crying</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant = "outlined" color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Walking to 358</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    12:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot variant = "outlined" color="secondary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Failing at learning typescript</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    9:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>dying</TimelineContent>
            </TimelineItem>
        </Timeline>
    </React.Fragment>
        </Stack>

        {/*yesterday demo just to see*/}
            <Stack>
                <Typography variant={"h3"} align ={"center"}>Sunday 3 April</Typography>
                <React.Fragment>
                    <Timeline position="left">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                09:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Crying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Walking to 358</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Failing at learning typescript</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                9:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>dying</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

        {/*try the custom one with icons and text*/}
            <React.Fragment>
        <Typography variant={"h2"}>custom view demo</Typography>
                <Typography variant={"h3"} align ={"center"}>Today</Typography>
        <Timeline position="right">
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary">
                    9:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FitnessCenterIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} style={{
                        padding: 8,
                        // backgroundColor: "primary",
                        border: "1px solid black"
                    }} >
                    <Typography variant="h6" component="span">
                        Exercise
                    </Typography>
                    <Typography>Ran a 5k</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary">
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <AutoStoriesIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} style={{
                        padding: 8,
                        backgroundColor: "secondary.main",
                        border: "1px solid black"
                    }} >
                    <Typography variant="h6" component="span">
                        Reading
                    </Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary">
                    11:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="secondary" variant="outlined">
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} style={{
                        padding: 8,
                        // backgroundColor: "primary",
                        border: "1px solid black"
                    }} >
                    <Typography variant="h6" component="span">
                        Schoolwork
                    </Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary">
                    1:30 pm
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    <TimelineDot color="primary">
                        <BedIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} style={{
                        padding: 8,
                        // backgroundColor: "primary",
                        border: "1px solid black"
                    }} >
                    <Typography variant="h6" component="span">
                        Sleep
                    </Typography>
                    <Typography></Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>

    </React.Fragment>

        </div>
);
}