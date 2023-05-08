import React, {ChangeEventHandler} from 'react';

interface DateInputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

const DateInput = ({value, onChange}:DateInputProps) => {
    return (
        <div className='dateInput'>
            <input type="date" value={value} onChange={onChange}/>
        </div>
    );
};

export default DateInput;