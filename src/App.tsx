import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'RTK Query', isDone: false},
    ]);

    const removeTask = (taskId: number) => {
        const newState = tasks.filter((task) => task.id !== taskId)
        setTasks(newState)
    }


    const removeAllTasks = () => {
        setTasks([])
    }


    // const addTask = (title: string) => {
    //     const task = {
    //         id: tasks.length + 1,
    //         title: title,
    //         isDone: false,
    //     }
    //     setTasks({
    //         ...tasks,
    //         task
    //     })
    // }

    return (
        <div className="App">
            <Todolist
                title="Whati to learn"
                tasks={tasks}
                removeTask={removeTask}
                removeAllTasks={removeAllTasks}
            />
        </div>
    );
}

export default App;
