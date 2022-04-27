import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import * as React from 'react';
import {useState} from 'react';
import {Actions, Category, useDispatch} from "../service/data";
import Moment from "react-moment";
import BasicDateTimePicker from "./BasicDateTimePicker";

type CategoryItemProps = { category: Category }

export default function CategoryItem({category}: CategoryItemProps) {
    const dispatch = useDispatch();
    const [openAddTimeDialog, setOpenAddTimeDialog] = useState(false)
    const [startTime, setStartTime] = React.useState<Date | null>(new Date());
    const [endTime, setEndTime] = React.useState<Date | null>(new Date());

    return (
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={0}>
            <Dialog open={openAddTimeDialog} onClose={() => setOpenAddTimeDialog(false)}>
                <DialogTitle>Add new {category.name} time block</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <BasicDateTimePicker label={"Start time"} value={startTime} setValue={setStartTime}/>
                        <BasicDateTimePicker label={"End time"} value={endTime} setValue={setEndTime}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Box pr={1} pb={1}>
                        <Stack spacing={1} direction="row">
                            <Button variant={'contained'} onClick={() => setOpenAddTimeDialog(false)}>Cancel</Button>
                            <Button variant={'contained'} onClick={() => {
                                dispatch({
                                    type: Actions.AddEventWithStopTime,
                                    id: category.id,
                                    startTime: startTime,
                                    endTime: endTime
                                })
                                setOpenAddTimeDialog(false)
                            }}>Add time block</Button>
                        </Stack>
                    </Box>
                </DialogActions>
            </Dialog>
            <Typography color={category.active ? 'secondary' : 'primary'}>{category.name}</Typography>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}>
                {category.currentEvent !== undefined &&
                    <Typography color={"secondary"}><Moment interval={100} date={category.currentEvent.startTime}
                                                            format="h:mm:ss"
                                                            durationFromNow/></Typography>
                }
                {category.currentEvent !== undefined ?
                    <Button variant={'contained'} color={'secondary'} onClick={() => {
                        dispatch({type: Actions.StopEvent, id: category.id})
                    }}>
                        Stop timer
                    </Button> : <Button variant={'contained'} color={'secondary'}
                                        onClick={() => dispatch({type: Actions.AddEvent, id: category.id})}>
                        Start timer
                    </Button>}
                <Button variant={'contained'} color={'secondary'} onClick={() => setOpenAddTimeDialog(true)}>
                    Add time
                </Button>
            </Stack>
        </Stack>
    )
}