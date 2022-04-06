import * as React from 'react';
import {Button, IconButton, Stack, TextField, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useEffect} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {usePersistState} from "../service/state";
import * as moment from 'moment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


type EventItemProps = {eventName: string}

export default function EventItem({eventName}: EventItemProps) {

    // placeholder for adding time blocks
    const [timeValue, setTimeValue] = React.useState<Date | null>(new Date());

    // test timer
    const Timer = () => {
        const [seconds, setSeconds] = usePersistState(0, "seconds" );
        const [isActive, setIsActive] = usePersistState(false, "isActive");
        const [timerStartMoment, setTimerStartMoment] = usePersistState(0, "timerStartMoment" );
        const [timerStopMoment, setTimerStopMoment] = usePersistState(0, "timerStopMoment")

        // functions to toggle, reset, and save the timer
        function toggle() {
            setIsActive(!isActive);
            setTimerStartMoment(moment.now()) // BUT WHEN WE RESTART THE TIMER, IT USES CURRENT MOMENT,NOT LAST ONE
        }
        // clear out the timer if the user does not want to save
        function reset() {
            setSeconds(0);
            setIsActive(false)
            setTimerStartMoment(null)
            setTimerStopMoment(null);
        }
        // save the end point of the timer
        // we need to only make it clickable when the timer has been started again
        // saving should also clear out all the past values
        function saveTimer() {
            setTimerStopMoment(moment.now())
            setSeconds(0);
            setIsActive(false)
            setTimerStartMoment(null)
            setTimerStopMoment(null);
        }

        useEffect(() => {
            let interval: number | NodeJS.Timeout | null | undefined = null;
            if (isActive) {
                interval = setInterval(() => {
                    setSeconds((seconds: number) => seconds + 1);
                }, 1000);
            } else if (!isActive && seconds !== 0) {
                // @ts-ignore
                clearInterval(interval);
            }
            return () => clearInterval(interval as NodeJS.Timeout);
        }, [isActive, seconds]);

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
                    spacing={0}>

                    {/*Timer button*/}
                    <Button color="secondary" variant="contained" size="small">
                        <div className="app">
                            <div className="time">
                                {seconds} s
                               {/* NEED TO SHOW THE TIME AS {timerStartMoment-moment.now()} BUT IT'S NOT IN THE RIGHT
                               FORMAT NOW UGHHHHHHHH. WE CAN JUST SHOW SECONDS THOUGH HAHA. but it should end up showing minutes,
                               hours, etc. how to do that?*/}
                            </div>
                            <div className="row">
                                <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                                    {isActive ? 'Pause' : 'Start'}
                                    <IconButton>
                                        <PlayArrowIcon/>
                                    </IconButton>
                                </button>
                                <button className="button" onClick={reset}>
                                    Clear
                                    <IconButton>
                                        <ClearIcon/>
                                    </IconButton>
                                </button>
                                <button className="button" onClick={saveTimer}>
                                    Save
                                    <IconButton>
                                        <CheckIcon/>
                                    </IconButton>
                                </button>
                            </div>
                        </div>
                    </Button>


                    {/*Placeholder for Date time picker. need to be able to input length of
                    the event and save it. */}
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
    return Timer()
}