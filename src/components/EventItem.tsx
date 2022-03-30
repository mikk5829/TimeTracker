import * as React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, TextField, Typography, useTheme} from "@mui/material";
import {NavigationProps} from "./Navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useState} from "react";

type EventItemProps = {eventName: string}



export default function EventItem({eventName}: EventItemProps) {

    const [openAddBlockDialog, setOpenAddBlockDialog] = useState(false) // open dialog to add time block


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
                <Button color="secondary" variant="contained" size = "large">
                     <IconButton>
                        <PlayArrowIcon/>
                    </IconButton>
                </Button>
                <Button color="primary" variant="contained" size = "large">
                    {/*test adding a popup when clicking on the calendar*/}

                    {/*<Dialog open={openAddBlockDialog}>*/}
                    {/*    <DialogTitle>*/}
                    {/*        add a time blockk*/}
                    {/*    </DialogTitle>*/}
                    {/*    <TextField value="hey">*/}
                    {/*    </TextField>*/}
                    {/*    <DialogActions>*/}
                    {/*        <Button variant="text" color="secondary" onClick={() => {*/}
                    {/*            setOpenAddBlockDialog(false) // close the dialog*/}
                    {/*        }}>*/}
                    {/*            Cancel*/}
                    {/*        </Button>*/}
                    {/*    </DialogActions>*/}
                    {/*</Dialog>*/}

                    <IconButton>
                        <CalendarMonthIcon/>
                    </IconButton>


                </Button>
            </Stack>
        </Stack>
    );
}