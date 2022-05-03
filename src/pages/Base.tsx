import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Navigation from "../components/Navigation";
import Home from "./Home";
import Trends from "./Trends";
import CalendarView from "./CalendarView";
import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export default function Base() {
    const [page, setPage] = useState(0);

    const Offset = styled('div')(({theme}) => theme.mixins.toolbar); // Fixing app bar not showing stuff behind it

    return (
        <Box pt={2}>
            {page === 0 && <Home/>}
            {page === 1 && <CalendarView/>}
            {page === 2 && <Trends/>}
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Navigation page={page} setPage={setPage}/>
            </AppBar>
            <Offset/>
        </Box>
    );
}