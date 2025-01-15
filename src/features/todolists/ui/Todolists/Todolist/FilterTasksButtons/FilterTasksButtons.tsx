import {changeTodolistFilterAC, FilterValuesType, TodolistType} from '../../../../model/todolistReducer';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import {filterButtonsContainerSx} from './FilterTasksButtons.styles';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';

type FilterTasksButtonsPropsType = {
    todolist: TodolistType
}

export const FilterTasksButtons = (props: FilterTasksButtonsPropsType) => {
    const {filter, id} = props.todolist
    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({filter, id}))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}
            >
                Completed
            </Button>
        </Box>
    )
}