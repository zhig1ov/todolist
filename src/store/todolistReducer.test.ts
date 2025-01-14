import {TodolistType} from '../app/App';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolistReducer';

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('REMOVE TODOLIST', () => {
    const action = removeTodolistAC(todolistId1)
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('ADD TODOLIST', () => {
    const endState = todolistReducer(startState, addTodolistAC('What to add'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to add')
})

test('EDIT_TODOLIST_TITLE', () => {
    const action = changeTodolistTitleAC({id: todolistId2, title: 'New Title'})

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('Change todolist filter', () => {
    const action = changeTodolistFilterAC({id: todolistId2, filter: 'active'})

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
})