import React from 'react';
import TextField from '@mui/material/TextField'

type EditabledSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditabledSpan = React.memo(({title, onChange}: EditabledSpanPropsType) => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>(title);

    const activatedEditMode = () => {
        setEditMode(true);
        setInputValue(title);
    }

    const deactivatedEditMode = () => {
        setEditMode(false);
        onChange(inputValue)
    }

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    return (
        < >
            {editMode ? (
                    <TextField
                        variant={'outlined'}
                        label={'Enter a title'}
                        value={inputValue}
                        onChange={changeTitleHandler}
                        onBlur={deactivatedEditMode}
                        autoFocus
                        size={'small'}
                    />
                )
                : (
                    <span onDoubleClick={activatedEditMode}>{title}</span>
                )
            }
        </>
    )
})