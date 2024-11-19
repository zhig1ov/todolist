import React, {useState} from 'react';
import {TaskType} from './App';
import {Button} from './Button';

type TodolistPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: number) => void;
    removeAllTasks: () => void;
}

export type FilterType = 'all' | 'completed' | 'active' | 'firstThree'

export const Todolist = ({title, tasks, removeTask, removeAllTasks}: TodolistPropsType) => {
    const [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    if (filter === 'all') {
        tasksForTodolist = tasks
    }

    if (filter === 'firstThree') {
        tasksForTodolist = tasks.slice(0, 3)
    }

    const changeFilter = (type: FilterType) => {
        setFilter(type)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"></Button>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasksForTodolist.map((t: TaskType) => (
                        <li
                            key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button
                                title={'x'}
                                onClick={() => removeTask(t.id)}
                            ></Button>
                        </li>
                    ))}
                </ul>
            )}
            <Button title={'Delete all tasks'} onClick={() => removeAllTasks()}/>
            <div>
                <Button onClick={() => changeFilter('all')} title="All"></Button>
                <Button onClick={() => changeFilter('active')} title="Active"></Button>
                <Button onClick={() => changeFilter('completed')} title="Completed"></Button>
                <Button onClick={() => changeFilter('firstThree')} title="First three tasks"></Button>
            </div>
        </div>
    );
}