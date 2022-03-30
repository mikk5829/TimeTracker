import * as React from 'react';
import {Button, Stack, Typography, useTheme} from "@mui/material";
import {NavigationProps} from "./Navigation";

type EventItemProps = {eventName: string}


export default function EventItem({eventName}: EventItemProps) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
        >
            <Typography variant={"body1"}>{eventName}</Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
            >
                <Button color="secondary" variant="contained">Start</Button>
                <Button color="secondary" variant="contained">Add Block</Button>
            </Stack>
        </Stack>
    );
}