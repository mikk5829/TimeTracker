import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";

export default function Timer() {
    const [number, setNumber] = useState(0)
    return (
            <Button variant={"contained"} onClick={() => setNumber(number + 1)}>
                <Typography variant={"body1"}>
                    Hello {number} &#10084;
                </Typography>
            </Button>
    );
}