import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
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
            addItemHandler();
        }
    }

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;