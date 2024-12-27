import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | EditTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type EditTodolistTitleActionType = ReturnType<typeof EditdTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof ChangedTodolistFilterAC>

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[]=> {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD_TODOLIST':
            return [
                ...state,
                {id: action.payload.id, title: action.payload.title, filter: 'all'},
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

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE_TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD_TODOLIST', payload: {title, id: v1()} } as const
}

 export const EditdTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'EDIT_TODOLIST_TITLE',
        payload: {
            id,
            title
        }
    } as const
}

export const ChangedTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

