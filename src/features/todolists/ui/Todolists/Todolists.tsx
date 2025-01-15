import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import React from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {selectTodolists} from '../../model/todolistsSelectors';
import {selectTasks} from '../../model/tasksSelectors';

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    return (<>
            {todolists.map(tl => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasks[tl.id]}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}