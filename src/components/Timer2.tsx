import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";

export default function TimerA() {
    const [number, setNumber] = useState(0)
    return (
        <Button variant={"contained"} color="secondary" onClick={() => setNumber(number + 42348)}>
            <Typography variant={"h2"}>
                alaina has this many pigs <br/>
                &#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055;&#128055; <br/>
                 {number} <br/>
                &#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;&#129433;
            </Typography>
        </Button>
    );
}
