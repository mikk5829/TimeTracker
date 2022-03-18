import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";
import {usePersistState} from "../service/state";

export default function TimerM() {
    const [number, setNumber] = usePersistState(0, 'mikkel-number')
        return (
            <Button variant={"contained"} color="error" onClick={() => setNumber(number + 17)}>
                <Typography variant={"h2"} align="center">
                    times mikkel says i lige måde<br/>&#127384;&#127384;&#127384;&#127384;
                    <br/>{number}
                </Typography>
            </Button>
    );
}


