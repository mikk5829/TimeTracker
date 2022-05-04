import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ColorPicker} from "material-ui-color";
import {Actions, Event, useDispatch, useTrackedState} from "../service/data";
import * as React from "react";
import BasicDateTimePicker from "./BasicDateTimePicker";
import {useEffect, useState} from "react";

export interface ChangeEventProps {
    openChangeDialog: any
    setOpenChangeDialog: any
    event: Event
}


export function ChangeEvent({openChangeDialog, setOpenChangeDialog, event}: ChangeEventProps) {
    const dispatch = useDispatch();
    const {categoryNames} = useTrackedState();

    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    useEffect(() => {
        setStartTime(event.startTime)
    }, [event.startTime])
    useEffect(() => {
        setEndTime(event.endTime ?? new Date())
    }, [event.endTime])

    return (
        <div>
            <Dialog fullWidth maxWidth={'md'} open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Are you sure you want to delete the event?</DialogTitle>
                <DialogActions>
                    <Box pr={1} pb={1}>
                        <Stack spacing={1} direction="row">
                            <Button color={"error"} variant={'text'}
                                    onClick={() => {
                                        setOpenChangeDialog(false)
                                        setOpenDeleteDialog(false)
                                        dispatch({type: Actions.DeleteEvent, id: event.id})
                                    }}>Delete</Button>
                            <Button variant={'contained'} onClick={() => {
                                setOpenDeleteDialog(false)
                            }}>Cancel</Button>
                        </Stack>
                    </Box>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth={'md'} open={openChangeDialog} onClose={() => setOpenChangeDialog(false)}>
                <DialogTitle>Edit {categoryNames[event.categoryId]}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            <BasicDateTimePicker label={"Start"} value={startTime} setValue={setStartTime}/>
                            <BasicDateTimePicker label={"End"} value={endTime} setValue={setEndTime}/>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Box pr={1} pb={1}>
                        <Stack spacing={1} direction="row">
                            <Button color={"error"} variant={'text'}
                                    onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
                            <Button variant={'contained'} onClick={() => setOpenChangeDialog(false)}>Cancel</Button>
                            <Button variant={'contained'} onClick={() => {
                                dispatch({
                                    type: Actions.EditEvent,
                                    id: event.id,
                                    startTime: startTime,
                                    endTime: endTime
                                })
                                setOpenChangeDialog(false)
                            }}>Save</Button>
                        </Stack>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )
}