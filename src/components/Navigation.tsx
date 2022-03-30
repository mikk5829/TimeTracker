import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {CalendarMonth, Equalizer, Home} from "@mui/icons-material";

export type NavigationProps = {
    page: number,
    setPage: any
}

export default function Navigation({page, setPage}: NavigationProps) {
    return (
        <BottomNavigation
            showLabels
            value={page}
            onChange={(event, newValue) => {
                setPage(newValue);
            }}
        >
            <BottomNavigationAction label="Home" icon={<Home/>}/>
            <BottomNavigationAction label="Calendar" icon={<CalendarMonth/>}/>
            <BottomNavigationAction label="Trends" icon={<Equalizer/>}/>
        </BottomNavigation>
    );
}