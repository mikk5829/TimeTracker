import React, {useState} from "react";
import {Button, Typography} from "@mui/material";

export default function TimerT() {
    const [number, setNumber] = useState(0)
    return (
        <Button variant={"outlined"} size='medium' color="info" onClick={() => setNumber(number + 69)}>
            <Typography variant={"h2"}>
                thomas bird pic counter <br/> &#128038;&#128038;&#128038;&#128038;
                <br/> {number}
            </Typography>
        </Button>
    );
}