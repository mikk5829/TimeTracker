import * as React from 'react';
import {Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import {Event} from "../service/data";
import Moment from "react-moment";
import CategoryItem from "../components/CategoryItem";

type EventItemProps = { event: Event, eventName: string} // , category: Category }

export default function EventItem({event, eventName}: EventItemProps) {


return (
    <Stack direction="row"
           justifyContent="space-between"
           alignItems="center"
           spacing={0}>
        {/*<Button variant="outlined">*/}
        {/*SHOULD WE SHOW THE DATE HERE??*/}
        {/*    <Typography>ID: {event.id}</Typography>*/}

        <Stack>
            <Typography>Date</Typography>
            <Typography>
                <Moment date = {event.startTime}
                        format="DD-MM-YYYY" /></Typography>
        </Stack>

        <Stack direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}>
            <Button variant = "contained">
                <Stack>
                    <Typography>Category</Typography>
                    <Typography>{eventName}</Typography>

                </Stack>
            </Button>

            <Button variant = "contained" color = "primary">
                <Stack>
                    <Typography>Start time</Typography>
                    <Typography>
                        <Moment date = {event.startTime}
                                format="hh:mm:ss" /></Typography>
                </Stack>
            </Button>

            <Button variant = "contained">
                <Stack>
                    <Typography>End time</Typography>
                    <Typography>
                        <Moment date = {event.endTime}
                                format="hh:mm:ss" /></Typography>
                </Stack>
            </Button>

        <Button variant = "contained">
            <Stack direction="column">
                <Typography> Duration </Typography>
            <Typography color={"secondary"}>
                <Moment duration={event.startTime}
                        date = {event.endTime}
                        format="h:mm:ss" /></Typography>
            </Stack>
        </Button>

    </Stack>
    </Stack>
)

}