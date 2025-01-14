import {FilterValuesType, TodolistType} from '../app/App';
import {v1} from 'uuid';

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | EditTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type EditTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD_TODOLIST':
            return [
                {id: action.payload.id, title: action.payload.title, filter: 'all'},
                ...state,
            ]
        case 'EDIT_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(filtered => filtered.id === action.payload.id ? {
                ...filtered,
                filter: action.payload.filter
            } : filtered)
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE_TODOLIST', payload: {id}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD_TODOLIST', payload: {title, id: v1()}} as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'EDIT_TODOLIST_TITLE',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}

