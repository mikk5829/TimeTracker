import * as React from 'react';
import {Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import {Event} from "../service/data";
import Moment from "react-moment";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
// import CategoryItem from "../components/CategoryItem";

type TLItemProps = { event: Event, eventName: string} // , category: Category }

export default function TLItem({event, eventName}: TLItemProps) {

    return (

        <React.Fragment>
            {/*<Typography variant={"h3"} align ={"center"}>Today</Typography>*/}
            <Timeline position="right">
                <TimelineItem>
                    <TimelineOppositeContent
                        sx={{m: 'auto 0'}}
                        align="right"
                        variant="body2"
                        color="text.secondary">
                        <Typography>
                          <Moment date={event.startTime}
                         format="HH:mm"/></Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector/>
                        <TimelineDot color="secondary">
                        </TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{py: '12px', px: 2}}>
                        <Typography variant="h3" component="span">
                            {eventName}
                        </Typography>
                        <Typography>
                            <Moment duration={event.startTime}
                                     date={event.endTime}
                                     format="h:mm:ss"/></Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </React.Fragment>
    )
}

//
//
//         <Stack direction="row"
//                justifyContent="space-between"
//                alignItems="center"
//                spacing={0}>
//             {/*<Button variant="outlined">*/}
//             {/*SHOULD WE SHOW THE DATE HERE??*/}
//             {/*    <Typography>ID: {event.id}</Typography>*/}
//
//             <Stack>
//                 <Typography>Date</Typography>
//                 <Typography>
//                     <Moment date={event.startTime}
//                             format="DD-MM-YYYY"/></Typography>
//             </Stack>
//
//             <Stack direction="row"
//                    justifyContent="space-between"
//                    alignItems="center"
//                    spacing={0}>
//                 <Button variant="contained">
//                     <Stack>
//                         <Typography>Category</Typography>
//                         <Typography>{event.categoryId}</Typography>
//                     </Stack>
//                 </Button>
//
//                 <Button variant="contained" color="primary">
//                     <Stack>
//                         <Typography>Start time</Typography>
//                         <Typography>
//                             <Moment date={event.startTime}
//                                     format="hh:mm:ss"/></Typography>
//                     </Stack>
//                 </Button>
//
//                 <Button variant="contained">
//                     <Stack>
//                         <Typography>End time</Typography>
//                         <Typography>
//                             <Moment date={event.endTime}
//                                     format="hh:mm:ss"/></Typography>
//                     </Stack>
//                 </Button>
//
//                 <Button variant="contained">
//                     <Stack direction="column">
//                         <Typography> Duration </Typography>
//                         <Typography color={"secondary"}>
//                             <Moment duration={event.startTime}
//                                     date={event.endTime}
//                                     format="h:mm:ss"/></Typography>
//                     </Stack>
//                 </Button>
//
//             </Stack>
//         </Stack>
//     )
// }

{/*    <React.Fragment>*/}
{/*        <Timeline position="right">*/}
{/*            <TimelineItem>*/}
{/*                <TimelineOppositeContent*/}
{/*                    sx={{ m: 'auto 0' }}*/}
{/*                    align="right"*/}
{/*                    variant="body2"*/}
{/*                    color="text.secondary">*/}
{/*                    9:30 am*/}
{/*                </TimelineOppositeContent>*/}
{/*                <TimelineSeparator>*/}
{/*                    <TimelineConnector />*/}
{/*                    <TimelineDot color = "secondary">*/}
{/*                    </TimelineDot>*/}
{/*                    <TimelineConnector />*/}
{/*                </TimelineSeparator>*/}
{/*                <TimelineContent sx={{ py: '12px', px: 2 }}>*/}
{/*                    <Typography variant="h3" component="span">*/}
{/*                        {event.categoryId}*/}
{/*                    </Typography>*/}
{/*                    <Typography><Moment duration={event.startTime}
                                    date={event.endTime}
                                    format="h:mm:ss"/></Typography></Typography>*/}
{/*                </TimelineContent>*/}
{/*            </TimelineItem>*/}
{/*        </Timeline>*/}
{/*    </React.Fragment>*/}
{/*</Stack>*/}

