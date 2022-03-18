import React from 'react';
import {Button, Divider, Stack, Typography} from "@mui/material";
import TimerM from "../components/Timer";
import TimerA from "../components/Timer2";
import TimerT from "../components/Timer3";

export default function Home() {
    return (
        <Stack spacing={1} direction='column' alignItems={"center"} alignContent={"center"}>
        <TimerM />
        <TimerA />
        <TimerT />
        </Stack> )

   ;
}