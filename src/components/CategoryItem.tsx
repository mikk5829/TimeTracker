import {Button, Stack, Typography} from "@mui/material";
import * as React from 'react';
import {Category} from "../service/data";
import Moment from "react-moment";

type CategoryItemProps = { category: Category, onStartTimer: any, onStopTimer: any }

export default function CategoryItem({category, onStartTimer, onStopTimer}: CategoryItemProps) {
    return (
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={0}>
            <Typography>{category.name}</Typography>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}>
                {category.currentEvent !== undefined &&
                    <Typography color={"secondary"}><Moment interval={100} date={category.currentEvent.startTime}
                                                            format="h:mm:ss"
                                                            durationFromNow/></Typography>
                }
                {category.currentEvent !== undefined ?
                    <Button variant={'contained'} color={'secondary'} onClick={onStopTimer}>
                        Stop timer
                    </Button> : <Button variant={'contained'} color={'secondary'} onClick={onStartTimer}>
                        Start timer
                    </Button>}
            </Stack>
        </Stack>
    )
}