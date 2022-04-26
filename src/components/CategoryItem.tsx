import {Button, Stack, Typography} from "@mui/material";
import * as React from 'react';
import {Actions, Category, usePersistReducer} from "../service/data";
import Moment from "react-moment";

type CategoryItemProps = { category: Category, onStartTimer: any, onStopTimer: any }

export default function CategoryItem({category, onStartTimer, onStopTimer}: CategoryItemProps) {
    const [{categories, categoryNames, events, error}, dispatch] = usePersistReducer()

    return (
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={0}>
            <Typography color={category.active ? 'secondary' : 'primary'}>{category.name}</Typography>
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