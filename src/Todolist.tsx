import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TaskType} from './App';
import {Button} from './Button';
import {useAutoAnimate} from '@formkit/auto-animate/react';

type TodolistPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string) => void;
    removeAllTasks: () => void;
    addTask: (taskTitle: string) => void;
    changeTaskStatus: (taskId: string, status: boolean) => void;
}

export type FilterType = 'all' | 'completed' | 'active'

export const Todolist = ({title, tasks, removeTask, removeAllTasks, addTask, changeTaskStatus}: TodolistPropsType) => {
    const [filter, setFilter] = useState<FilterType>('all')
    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    let tasksForTodolist = tasks
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    if (filter === 'all') {
        tasksForTodolist = tasks
    }

    const changeFilterHandler = (type: FilterType) => {
        setFilter(type)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {

        setInputTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if(inputTitle.trim() !== '') {
            addTask(inputTitle.trim())
            setInputTitle('')
        } else {
            setError('title is required')
        }
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={inputTitle}
                    onChange={onChangeTitle}
                    onKeyUp={onKeyUpHandler}
                    className={error ? 'error' : ''}
                />
                <Button onClick={addTaskHandler} title="+"></Button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul ref={listRef}>
                    {tasksForTodolist.map((t: TaskType) => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(t.id, newStatusValue)
                        }

                        return <li
                            className={t.isDone ? 'is-done' : ''}
                            key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{t.title}</span>
                            <Button
                                title={'x'}
                                onClick={() => removeTask(t.id)}
                            ></Button>
                        </li>
                    })}
                </ul>
            )}
            <Button title={'Delete all tasks'} onClick={() => removeAllTasks()}/>
            <div>
                <Button
                    onClick={() => changeFilterHandler('all')}
                    title="All"
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    onClick={() => changeFilterHandler('active')}
                    title="Active"
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    onClick={() => changeFilterHandler('completed')}
                    title="Completed"
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    );
}