import {useCallback} from 'react';
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from '../../../../model/todolistReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditabledSpan} from '../../../../../../common/components/EditabledSpan/EditabledSpan';
import IconButton from '@mui/material/IconButton';
import styled from './TodolistTitle.module.css'
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';

type TodolistTitlePropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const {title, id} = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch, id])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC({id, title: newTitle}))
    }, [dispatch, id])

    return (
        <div className={styled.container}>
            <h3>
                <EditabledSpan title={title} onChange={updateTodolistHandler}/>
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}