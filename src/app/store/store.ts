import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../../features/todolists/model/tasks-reducer';
import {todolistReducer} from '../../features/todolists/model/todolistReducer';
import {appReducer} from '../app-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store