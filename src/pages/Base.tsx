import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Navigation from "../components/Navigation";
import Home from "./Home";
import Trends from "./Trends";
import Calendar from "./Calendar";

export default function Base() {
    const [page, setPage] = useState(0);

    return (
        <div>
            {page === 0 && <Home/>}
            {page === 1 && <Calendar/>}
            {page === 2 && <Trends/>}
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Navigation page={page} setPage={setPage}/>
            </AppBar>
        </div>
    );
}