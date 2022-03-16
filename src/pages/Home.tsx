import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import Timer from "../components/Timer";

export default function Home() {
    return (
        <Stack spacing={9} alignItems={"center"} alignContent={"center"}>
        <Timer />
        <Timer />
        <Timer />
        <Timer />
        <Timer />
        </Stack>
    );
}