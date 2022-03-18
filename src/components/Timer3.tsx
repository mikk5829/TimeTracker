import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import {usePersistState} from "../service/state";

export default function TimerT() {
    const [number, setNumber] = usePersistState(0, 'thomas-number')
    return (
        <Button variant={"outlined"} size='medium' color="info" onClick={() => setNumber(number + 69)}>
            <Typography variant={"h2"}>
                thomas bird pic counter <br/> &#128038;&#128038;&#128038;&#128038;
                <br/> {number}
            </Typography>
        </Button>
    );
}