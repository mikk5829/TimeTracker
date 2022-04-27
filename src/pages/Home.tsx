import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Button, Dialog, DialogActions, DialogTitle, IconButton, Paper, Stack,
    Table,
    TableBody,
    TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import TableSortLabel from '@mui/material/TableSortLabel';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import {Actions, Category, Event, usePersistReducer} from "../service/data";
import {useSnackbar} from "notistack";
import CategoryItem from "../components/CategoryItem";
import EventItem from "../components/EventItem";
import Moment from "react-moment";
import {styled} from '@mui/material/styles';

export default function Home() {
    const {enqueueSnackbar} = useSnackbar();
    const [{categories, categoryNames, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false) // open dialog to add categories
    const [addCategoryText, setAddCategoryText] = useState("") // what the user types to add as a category

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


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {variant: "error"})
            dispatch({type: Actions.DismissError})
        }
    }, [error])

    return (
        <div>
            <Typography color={"secondary"} variant={"h4"}>TimeTracker</Typography>
            <Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                >
                    {/*Add buttons for settings and adding a category*/}
                    <Typography color={"primary"} variant={"h6"}>Add Events</Typography>
                    <Stack direction="row">
                        <IconButton aria-label="settings" color="primary"
                                    onClick={() => setOpenAddCategoryDialog(true)}>
                            <SettingsIcon/>
                        </IconButton>

                        <IconButton aria-label="add" color="primary" onClick={() => setOpenAddCategoryDialog(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>

                    {/*Show one row per category that the user has added*/}
                </Stack>
                {categories?.map((cat: Category) => {
                    return <div onClick={() => dispatch({type: Actions.ToggleActiveCategory, id: cat.id})}><CategoryItem
                        key={cat.id} category={cat}
                        onStartTimer={() => dispatch({type: Actions.AddEvent, id: cat.id})}
                        onStopTimer={() => {
                            console.log("hall");
                            dispatch({type: Actions.StopEvent, id: cat.id})
                        }}/></div> // stack all the user's specified categories
                })}
            </Stack>

            {/*<Stack>*/}
            {/*    <Typography variant={"h3"}>Event history</Typography>*/}
            {/*    <Stack*/}
            {/*        direction="column-reverse"*/}
            {/*        justifyContent="space-between"*/}
            {/*        alignItems="center"*/}
            {/*        spacing={0}*/}
            {/*    >*/}
            {/*        /!*<Typography variant={"h3"}>Event history</Typography>*!/*/}
            {/*        {events?.map((event: Event) => {*/}
            {/*            return <EventItem event={event} eventName={categoryNames[event.categoryId]}/>*/}
            {/*            // <Typography>{event.id} + {categoryNames[event.categoryId]}</Typography> // stack all the user's specified categories*/}
            {/*        })}*/}
            {/*    </Stack>*/}
            {/*</Stack>*/}

            {/*Use a table to show event history*/}
            <Typography color={"primary"} variant={"h6"}>Event history</Typography>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table"
                       sx={{minWidth: 200}} size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography color={"primary"} variant={"h3"}>Start time</Typography></TableCell>
                            <TableCell align="left"><Typography color={"primary"}
                                                                variant={"h3"}>Event</Typography></TableCell>
                            <TableCell align="left"><Typography color={"primary"}
                                                                variant={"h3"}>Duration</Typography></TableCell>
                            <TableCell width="10" align="left"><Typography color={"primary"}
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
                                                format="DD-MM-YY HH:mm"/>
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
                                    <IconButton aria-label="settings" color="primary">
                                        {/*onClick={() => setOpenAddCategoryDialog(true)}>*/}
                                        <SettingsIcon/>
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