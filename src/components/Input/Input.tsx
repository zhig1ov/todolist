import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    className: string
}

const Input = ({value, onChange, onKeyDown, className }: InputPropsType) => {
    return (
        <input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={className}
        />
    );
};

export default Input;