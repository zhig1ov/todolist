import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Input from '../Input/Input';
import {Button} from '../Button/Button';

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
            <Input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <Button onClick={addItemHandler} title={'+'}></Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;