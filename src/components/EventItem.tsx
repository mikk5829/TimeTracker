import * as React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, TextField, Typography, useTheme} from "@mui/material";
import {NavigationProps} from "./Navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useState} from "react";

import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {dateRangePickerDayClasses} from "@mui/lab";
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import {useNow} from "@mui/lab/internal/pickers/hooks/useUtils";

type EventItemProps = {eventName: string}



export default function EventItem({eventName}: EventItemProps) {

    const [openAddBlockDialog, setOpenAddBlockDialog] = useState(false) // open dialog to add time block

    // placeholder for setting time blocks
    const [timeValue, setTimeValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'));

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
        >
            <Typography variant={"body1"}>{eventName}</Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
            >
                {/*Placeholder for Timer button*/}
                <Button color="secondary" variant="contained" size = "large">
                     <IconButton>
                        <PlayArrowIcon/>
                    </IconButton>
                </Button>

                {/*Placeholder for Date time picker*/}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        value={timeValue}
                        onChange={(newValue) => {
                            setTimeValue(newValue);
                        }}
                    />
                </LocalizationProvider>


            </Stack>
        </Stack>
    );
}