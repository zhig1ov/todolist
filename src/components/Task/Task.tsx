import React, {ChangeEvent, useCallback} from 'react';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from '../../Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import {EditabledSpan} from '../EditabledSpan/EditabledSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../../app/App';

type TaskPropsType = {
    id: string
    todolistId: string
    t: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}
export const Task = (props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.t.id, props.todolistId)
    }, [props.removeTask, props.t.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.t.id, e.currentTarget.checked, props.todolistId);
    }, [props.changeTaskStatus, props.t.id, props.todolistId]);

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.t.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.todolistId, props.t.id])

    return <ListItem
        key={props.t.id}
        sx={getListItemSx(props.t.isDone)}
    >
        <div>
            <Checkbox
                onChange={onChangeHandler}
                checked={props.t.isDone}/>
            <EditabledSpan title={props.t.title} onChange={onChangeTitleHandler}/>
        </div>
        <IconButton onClick={removeTaskHandler}>
            <DeleteIcon/>
        </IconButton>
    </ListItem>
}