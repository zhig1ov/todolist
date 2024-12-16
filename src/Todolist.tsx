import React, {ChangeEvent} from 'react';
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles'
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {EditabledSpan} from './components/EditabledSpan/EditabledSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskCallback = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.id, newTitle)
    }


    return <div>
        <div className={'todolist-title-container'}>
            <EditabledSpan title={props.title} onChange={updateTodolistHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
        <AddItemForm addItem={addTaskCallback}/>
        <List>
            {
                props.tasks.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }

                    return <ListItem
                        key={t.id}
                        sx={getListItemSx(t.isDone)}
                    >
                        <div>
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}/>
                            <EditabledSpan title={t.title} onChange={onChangeTitleHandler}/>
                        </div>
                        <IconButton onClick={removeTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                })
            }
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
}
