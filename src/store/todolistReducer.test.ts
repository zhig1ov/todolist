import {TodolistType} from '../App';
import {v1} from 'uuid';
import {
    addTodolistAC,
    ChangedTodolistFilterAC,
    EditdTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolistReducer';


test('REMOVE TODOLIST', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();


    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(initialState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('ADD TODOLIST', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();


    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(initialState, addTodolistAC('What to add'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to add')
})

test('EDIT_TODOLIST_TITLE', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();


    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'EDIT_TODOLIST_TITLE',
        payload: {
            id: todolistID2,
            title: 'New Title'
        }
    } as const

    const endState = todolistReducer(initialState, EditdTodolistTitleAC(todolistID2, 'New Title'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('Change todolist filter', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();


    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id: todolistID2,
            filter: 'active'
        }
    } as const

    const endState = todolistReducer(initialState, ChangedTodolistFilterAC(todolistID2, 'active'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})