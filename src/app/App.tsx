import React, {useState} from 'react';
import './App.css';
import {Todolist} from '../Todolist';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {MenuButton} from '../components/MenuButton/MenuButton';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../store/todolistReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

type ThemeMode = 'dark' | 'light';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const dispatch = useDispatch()


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}));
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}));
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone}));
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}));
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton background={theme.palette.primary.dark}>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];

                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid key={tl.id}>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        title={tl.title}
                                        key={tl.id}
                                        id={tl.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default AppWithRedux;
