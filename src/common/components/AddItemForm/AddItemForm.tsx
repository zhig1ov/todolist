import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = useCallback(() => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }, [addItem, title])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItemHandler();
        }
    }, [addItemHandler, error])

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
});

export default AddItemForm;