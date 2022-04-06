import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EventItem from "../components/EventItem";
import {Category, usePersistReducer} from "../service/data";
import {useSnackbar} from "notistack";

export default function Home() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [{categories, events, error}, dispatch] = usePersistReducer() // useReducer(reducer, initialState);

    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false) // open dialog to add categories

    const [addCategoryText, setAddCategoryText] = useState("") // what the user types to add as a category

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {variant: "error"})
            dispatch({type: "dismissError"})
        }
    }, [error])

    return (
        <div>

            <Typography variant={"h1"}>TimeTracker</Typography>
            <Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                >
                    {/*Add buttons for settings and adding a category*/}
                    <Typography variant={"h2"}>Add Events</Typography>
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
                    return <EventItem eventName={cat.name}/> // stack all the user's specified categories
                })}
            </Stack>

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
                        try {
                            dispatch({type: "addCategory", name: addCategoryText})
                        } catch (e) {

                        }
                        // AddCategory(addCategoryText) // add whatever the user typed to the category list
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