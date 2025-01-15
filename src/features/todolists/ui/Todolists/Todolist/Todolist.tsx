import React, {useCallback} from 'react';
import AddItemForm from '../../../../../common/components/AddItemForm/AddItemForm';
import {TodolistType} from '../../../model/todolistReducer';
import {addTaskAC, TaskType} from '../../../model/tasks-reducer';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import {Tasks} from './Tasks/Tasks';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';


type TodolistPropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    const {
        todolist
    } = props

    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}));
    }, [dispatch, todolist.id])

    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTaskCallback}/>
        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </div>
})


