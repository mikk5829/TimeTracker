import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Dispatch} from "react";
import {Box, Stack} from "@mui/material";
import daLocale from 'date-fns/locale/da';
import {DatePicker, TimePicker} from "@mui/x-date-pickers";

export type BasicDateTimePickerProps = {
    label: string
    value: Date | null
    setValue: Dispatch<React.SetStateAction<Date | null>>
}

export default function BasicDateTimePicker({label, value, setValue}: BasicDateTimePickerProps) {
    return (
        <Box p={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={daLocale}>
                <Stack direction={'row'} spacing={2}>
                    <DatePicker
                        renderInput={(props) => <TextField {...props} fullWidth/>}
                        label={label + " date"}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <TimePicker
                        renderInput={(props) => <TextField {...props} fullWidth/>}
                        label={label + " time"}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Stack>
            </LocalizationProvider>
        </Box>
    );
}