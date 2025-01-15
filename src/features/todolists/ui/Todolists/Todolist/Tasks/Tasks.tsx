import {TodolistType} from '../../../../model/todolistReducer';
import List from '@mui/material/List';
import {Task} from './Task/Task';
import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {selectTasks} from '../../../../model/tasksSelectors';

type TasksPropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: TasksPropsType) => {

    const tasks = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map(task => {
                        return (
                            <Task
                                key={task.id}
                                todolist={todolist}
                                task={task}
                            />
                        )
                    })}
                </List>
            )}
        </>
    )
}