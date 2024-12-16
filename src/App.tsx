import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
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
import {MenuButton} from './components/MenuButton/MenuButton';

export type FilterValuesType = 'all' | 'active' | 'completed';

type ThemeMode = 'dark' | 'light';

type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)});
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, isDone} : t))});
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, title: newTitle} : t))});
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }

    const updateTodolist = (todolistId: string, newTitle: string) => {
        const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        setTodolists(newTodolists)
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
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
                            <Grid>
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

export default App;
