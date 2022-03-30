import * as React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EventItem from "../components/EventItem";
import {usePersistState} from "../service/state";
import {useState} from "react";

// function AddCategoryDialog() {
//
// }

export default function Home() {
    const [categories, setCategories] = usePersistState([], "categories") // store tracked categories

    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false) // open dialog to add categories

    const [addCategoryText, setAddCategoryText] = useState("") // what the user types to add as a category

    const AddCategory = (categoryName: string) => {
        setCategories((categories: any) => [...categories, categoryName]) // append the previous categories with new one
    }

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

                    <Typography variant={"h2"}>Add Events</Typography>
                    <Stack direction = "row">
                        <IconButton aria-label="settings"  color="primary" onClick={() => setOpenAddCategoryDialog(true)}>
                            <SettingsIcon/>
                        </IconButton>

                        <IconButton aria-label="add"  color="primary" onClick={() => setOpenAddCategoryDialog(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>


                </Stack>
                {categories.map((cat: string) => {
                    return <EventItem eventName={cat}/> // stack all the user's specified categories
                })}
            </Stack>


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
                        AddCategory(addCategoryText) // add whatever the user typed to the category list
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