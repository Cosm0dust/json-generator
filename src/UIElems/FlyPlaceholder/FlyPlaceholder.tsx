import React, {ChangeEventHandler} from 'react';

interface CustomInputProps {
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

const FlyPlaceholder = ({placeholder, value, onChange} : CustomInputProps) => {
    return (
        <div className='inputContainer'>
            <div className='inputBox'>
                <input type="text"  value={value} onChange={onChange}/>
                <span>{placeholder}</span>
            </div>
        </div>
    );
};

export default FlyPlaceholder;