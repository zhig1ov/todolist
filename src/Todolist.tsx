import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from './Button';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <div className={'todolist-title-container'}>
            <h3>{props.title}</h3>
            <Button title='X' onClick={removeTodolistHandler}/>
        </div>
        <div>
        <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <Button onClick={addTask} title={'+'}></Button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button onClick={onClickHandler} title="x"></Button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler} title="All"></Button>
            <Button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler} title="Active"></Button>
            <Button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler} title="Completed"></Button>
        </div>
    </div>
}