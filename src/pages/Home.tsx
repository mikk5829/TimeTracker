import * as React from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EventItem from "../components/EventItem";

export default function Home() {
    return (
        <div>
            <Typography variant={"h1"}>TimeTracker</Typography>
            <Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                >
                    <Typography variant={"h2"}>Add Events</Typography>
                    <IconButton aria-label="add" disabled color="primary">
                        <AddIcon/>
                    </IconButton>
                </Stack>
                <EventItem eventName="Reading"/>
                <EventItem eventName="Running"/>
                <EventItem eventName="Cooking"/>
                <EventItem eventName="Commute"/>
            </Stack>
        </div>
    );
}