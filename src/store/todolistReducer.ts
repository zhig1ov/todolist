import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | EditTodolistTitleActionType | ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    payload: {
        id: string
    }
}

type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    payload: {
        title: string
    }
}

type EditTodolistTitleActionType = {
    type: 'EDIT_TODOLIST_TITLE',
    payload: {
        id: string,
        title: string
    }
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    payload: {
        id: string
        filter: FilterValuesType
    }
}

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[]=> {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD_TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.payload.title, filter: 'all'},
                //Дописать добавление тасок
            ]
        case 'EDIT_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(filtered => filtered.id === action.payload.id ? {...filtered, filter: action.payload.filter} : filtered)
        default:
            throw new Error('Unknown action type');
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE_TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title
        }
    } as const
}

 export const EditdTodolistTitleAC = (id: string, title: string): EditTodolistTitleActionType => {
    return {
        type: 'EDIT_TODOLIST_TITLE',
        payload: {
            id,
            title
        }
    } as const
}

export const ChangedTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

