import React, {useCallback} from 'react';
import {filterButtonsContainerSx} from './Todolist.styles'
import {FilterValuesType, TaskType} from './app/App';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {EditabledSpan} from './components/EditabledSpan/EditabledSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import {Task} from './components/Task/Task';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const addTaskCallback = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        props.updateTodolist(props.id, newTitle)
    }, [props.updateTodolist, props.id])

    return <div>
        <div className={'todolist-title-container'}>
            <EditabledSpan title={props.title} onChange={updateTodolistHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
        <AddItemForm addItem={addTaskCallback}/>
        <List>
            {tasksForTodolist.map(t => (
                    <Task
                        todolistId={props.id}
                        id={t.id}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        t={t}
                        key={t.id}
                    />
                )
            )}
        </List>
        <Box sx={filterButtonsContainerSx}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </Box>
    </div>
})


