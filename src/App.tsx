import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'RTK Query', isDone: false},
    ]);

    const removeTask = (taskId: string) => {
        const newState = tasks.filter((task) => task.id !== taskId)
        setTasks(newState)
    }

    const removeAllTasks = () => {
        setTasks([])
    }

    const addTask = (taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, status: boolean) => {
        const newState = tasks.map(t => (t.id === taskId ? {...t, isDone: status} : t))
        setTasks(newState)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                removeAllTasks={removeAllTasks}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;


