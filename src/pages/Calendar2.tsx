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
import {Category, usePersistReducer} from "../service/data";
import EventItem from "../components/EventItem";

// could this be used? https://reactjsexample.com/a-calendar-timetable-for-react-native/
// or should we just use Timeline from Mui? https://mui.com/components/timeline/
// if we do timeline, we can do experiments on type/format of timeline

export default function Calendar() {

    // Set the date picker at the top - default to today
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

    const [{categories, events, error}, dispatch] = usePersistReducer()

    return (
        <div>
        <Typography variant={"h2"}>Calendar 2</Typography>
            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
            {/*    <DatePicker*/}
            {/*        label="Select date"*/}
            {/*        value={dateValue}*/}
            {/*        onChange={(newValue) => {*/}
            {/*            setDateValue(newValue);*/}
            {/*        }}*/}
            {/*        renderInput={(params) => <TextField {...params} />}*/}
            {/*    />*/}
            {/*</LocalizationProvider>*/}
        {/*<Stack>*/}
        {/*    <Typography variant={"h3"} align ={"center"}>Tue 19 April</Typography>*/}
        {/*    /!*<Stack>*!/*/}
        {/*    /!*    {categories?.map((cat: Category) => {*!/*/}
        {/*    /!*        return<Typography>Category: {cat.name}*!/*/}
        {/*    /!*             ID: {cat.ID}</Typography> // stack all the user's specified categories*!/*/}
        {/*    /!*    })}*!/*/}
        {/*    </Stack>*/}


            <Stack>
                <Typography variant={"h3"} align ={"center"}>Tue 19 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                09:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Napping</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot  color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                5:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                8:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Cleaning</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            {/*yesterday*/}
            <Stack>
                <Typography variant={"h3"} align ={"center"}>Mon 18 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                08:45 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:45 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                5:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            <Stack>
                <Typography variant={"h3"} align ={"center"}>Sun 17 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                11:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                9:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            <Stack>
                <Typography variant={"h3"} align ={"center"}>Sat 16 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                08:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                11:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                9:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            <Stack>
                <Typography variant={"h3"} align ={"center"}>Fri 15 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                09:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Cleaning</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                1:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                8:20 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            <Stack>
                <Typography variant={"h3"} align ={"center"}>Thu 14 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                07:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Reading</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Exercise</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                9:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Movies</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

            <Stack>
                <Typography variant={"h3"} align ={"center"}>Wed 13 April</Typography>
                <React.Fragment>
                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                09:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                12:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Studying</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="text.secondary">
                                9:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Movies</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </React.Fragment>
            </Stack>

        </div>
);
}