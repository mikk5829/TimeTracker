import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import {Actions, Category, Event, useDispatch, useTrackedState} from "../service/data";
import CategoryItem from "../components/CategoryItem";
import Moment from "react-moment";
import {styled} from '@mui/material/styles';
import {useSnackbar} from "notistack";
import {Delete, Edit} from "@mui/icons-material";
import {ChangeEvent} from "../components/ChangeEvent";

export default function Home() {
    const dispatch = useDispatch();
    const {categories, categoryNames, events, error} = useTrackedState();
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false) // open dialog to add categories
    const [addCategoryText, setAddCategoryText] = useState("") // what the user types to add as a category
    const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false) // open dialog to delete categories
    const [openChangeDialog, setOpenChangeDialog] = useState(false) // open dialog to edit events
    const [currentEvent, setCurrentEvent] = useState<Event>(new Event()) //


    const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {variant: "error"})
            dispatch({type: Actions.DismissError})
        }
    }, [error])

    // test table cell stuff
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            <ChangeEvent event={currentEvent} openChangeDialog={openChangeDialog}
                         setOpenChangeDialog={setOpenChangeDialog}/>
            <Typography align="left" color={"secondary"} variant={"h1"}>TimeTracker</Typography>
            <Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                >
                    {/*Add buttons for settings and adding a category*/}
                    <Typography align="left" color={"primary"} variant={"h5"}>Categories tracked</Typography>
                    <Stack direction="row">
                        <IconButton aria-label="add" color="primary" onClick={() => setOpenAddCategoryDialog(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>

                    {/*Show one row per category that the user has added*/}
                </Stack>
                <Stack spacing={0.5} divider={<Divider orientation="horizontal" flexItem/>}>
                    {categories?.filter((cat: Category) => cat.active).map((cat: Category) => {
                        return <CategoryItem
                            key={cat.id} category={cat}/> // stack all the user's specified categories
                    })}
                </Stack>
            </Stack>
            <br/>
            {/*Use a table to show event history*/}

            <Typography align="left" color={"primary"} variant={"h5"}>Event history</Typography>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table"
                       sx={{maxWidth: '100%'}} size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell width="100" align="left"><Typography color={"primary"} variant={"h3"}>Start
                                time</Typography></TableCell>
                            <TableCell width="30" align="left"><Typography color={"primary"}
                                                                           variant={"h3"}>Event</Typography></TableCell>
                            <TableCell width="30" align="left"><Typography color={"primary"}
                                                                           variant={"h3"}>Duration</Typography></TableCell>
                            <TableCell width="9" align="center"><Typography color={"primary"}
                                                                            variant={"h3"}>Edit</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events?.map((event: Event) => (
                            <StyledTableRow
                                key={event.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <StyledTableCell component="th" scope="row" align="left">
                                    <Typography color={"primary"}>
                                        <Moment date={event.startTime}
                                                format="D/M  HH:mm"/>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography color={"primary"}>{categoryNames[event.categoryId]}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography color={"primary"}>
                                        <Moment duration={event.startTime}
                                                date={event.endTime}
                                                format="h:mm:ss"/>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton aria-label="settings" color="error"
                                                onClick={() => {
                                                    setCurrentEvent(event)
                                                    setOpenChangeDialog(true)
                                                }}>
                                        <Edit/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/*Workflow to add a new category*/}
            <Dialog open={openAddCategoryDialog}>
                <DialogTitle>
                    Add a new category to track
                </DialogTitle>
                <TextField value={addCategoryText} onChange={event => setAddCategoryText(event.target.value)}>
                </TextField>
                <DialogActions>
                    <Button variant="text" color="secondary" onClick={() => {
                        setOpenAddCategoryDialog(false) // close the dialog
                    }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => {
                        dispatch({type: Actions.AddCategory, name: addCategoryText}) // add whatever the user typed to the category list
                        setAddCategoryText("") // clear it out afterwards
                        setOpenAddCategoryDialog(false) // close the dialog
                    }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}