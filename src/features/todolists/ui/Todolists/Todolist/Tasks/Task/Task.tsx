import React, {ChangeEvent} from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import {EditabledSpan} from '../../../../../../../common/components/EditabledSpan/EditabledSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from '../../../../../model/tasks-reducer';
import {TodolistType} from '../../../../../model/todolistReducer';
import {getListItemSx} from './Task.styles';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';

type TaskPropsType = {
    task: TaskType
    todolist: TodolistType
}

export const Task = (props: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const {
        todolist,
        task,
    } = props

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: e.currentTarget.checked, todolistId: todolist.id}))
    }

    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, todolistId: todolist.id, title: newTitle}));
    }

    return (
        <ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox
                    onChange={changeTaskStatus}
                    checked={task.isDone}/>
                <EditabledSpan title={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}