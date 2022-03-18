import React from 'react';
import {Button, Stack, Typography, Divider} from "@mui/material";
import TimerM from "../components/Timer";
import TimerA from "../components/Timer2";
import TimerT from "../components/Timer3";

export default function Home2() {
    return (
        <Stack spacing={1} direction='row' alignItems={"center"} alignContent={"center"}
        divider={<Divider orientation="vertical" flexItem />}>
            <TimerM />
            <TimerA />
            <TimerT />
            <TimerM />
            <TimerA />
            <TimerT />
            <TimerM />
            <TimerA />
            <TimerT />
            <TimerM />
            <TimerA />
            <TimerT />
            <TimerM />
            <TimerA />
            <TimerT />
            <TimerM />
            <TimerA />
            <TimerT />
        </Stack> )

        ;
}