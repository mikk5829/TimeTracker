import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";
import {usePersistState} from "../service/state";

export default function TimerA() {
    const [number, setNumber] = usePersistState(0, 'alaina-number')
    return (
        <Button variant={"contained"} color="primary" onClick={() => setNumber(number + 42348)}>
            <Typography variant={"h2"}>
                alaina has this many pigs <br/>
                &#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055; <br/>
                 {number} <br/>
                &#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;
            </Typography>
        </Button>
    );
}
