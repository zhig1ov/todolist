import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../store/tasks-reducer';
import {todolistReducer} from '../../store/todolistReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store