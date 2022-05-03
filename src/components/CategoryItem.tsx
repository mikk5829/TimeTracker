import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import * as React from 'react';
import {useState} from 'react';
import {ColorPalette} from 'mui-color';
import {Actions, Category, useDispatch} from "../service/data";
import {Color, ColorPicker, createColor} from "material-ui-color";
import Moment from "react-moment";
import BasicDateTimePicker from "./BasicDateTimePicker";
import {Edit, MoreTime, PlayArrow, Stop} from "@mui/icons-material";

type CategoryItemProps = { category: Category }

export default function CategoryItem({category}: CategoryItemProps) {
    const dispatch = useDispatch();
    const [openAddTimeDialog, setOpenAddTimeDialog] = useState(false)
    const [openChangeDialog, setOpenChangeDialog] = useState(false)
    const [startTime, setStartTime] = useState<Date | null>(new Date())
    const [endTime, setEndTime] = useState<Date | null>(new Date())
    const [color, setColor] = useState(category.color ?? createColor('cyan'))
    const [name, setName] = useState(category.name ?? "")
    const theme = useTheme()

    const palette = {
        color1: '#F9ED69',
        color2: '#F08A5D',
        color3: '#B83B5E',
        color4: '#6A2C70',
    };

    const handleColorChange = (newValue: Color) => {
        setColor(newValue);
    };

    return (
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={0}>
            <Dialog fullWidth maxWidth={'md'} open={openAddTimeDialog} onClose={() => setOpenAddTimeDialog(false)}>
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
            <Dialog fullWidth maxWidth={'md'} open={openChangeDialog} onClose={() => setOpenChangeDialog(false)}>
                <DialogTitle>Edit {category.name}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant={"body1"}>Pick a category color</Typography>
                        <ColorPicker value={color} onChange={handleColorChange} palette={palette} hideTextfield
                                     disableAlpha/>
                        <TextField label={"Name"} value={name} onChange={(event) => setName(event.target.value)}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Box pr={1} pb={1}>
                        <Stack spacing={1} direction="row">
                            <Button variant={'contained'} onClick={() => setOpenChangeDialog(false)}>Cancel</Button>
                            <Button variant={'contained'} onClick={() => {
                                dispatch({
                                    type: Actions.ChangeCategoryColor,
                                    id: category.id,
                                    color: color
                                })
                                if (name !== category.name) {
                                    dispatch({
                                        type: Actions.RenameCategory,
                                        id: category.id,
                                        name: name
                                    })
                                }
                                setOpenChangeDialog(false)
                            }}>Save</Button>
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
                    <Typography color={"secondary"}>
                        <Moment interval={1000} date={category.currentEvent.startTime}
                                format="h:mm:ss"
                                durationFromNow/></Typography>
                }
                {category.currentEvent !== undefined ?
                    <Avatar sx={{bgcolor: theme.palette.secondary.main, width: 50, height: 50}} onClick={() => {
                        dispatch({type: Actions.StopEvent, id: category.id})
                    }}>
                        <Stop/>
                    </Avatar>
                    :
                    <Avatar sx={{bgcolor: theme.palette.success.light, width: 50, height: 50}} onClick={() => {
                        dispatch({type: Actions.AddEvent, id: category.id})
                    }}>
                        <PlayArrow/>
                    </Avatar>
                }
                <Avatar onClick={() => setOpenAddTimeDialog(true)}
                        sx={{bgcolor: "#" + category.color.hex, width: 50, height: 50}}>
                    <MoreTime/>
                </Avatar>
                <Avatar onClick={() => setOpenChangeDialog(true)}
                        sx={{bgcolor: "#" + category.color.hex, width: 50, height: 50}}>
                    <Edit/>
                </Avatar>
            </Stack>
        </Stack>
    )
}