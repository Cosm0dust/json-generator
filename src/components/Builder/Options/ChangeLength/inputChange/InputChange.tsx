import React, { useState } from 'react';
import s from './InputChange.module.css';
import NeonBorderButton from '../../../../../UIElems/NeonBorderButton/NeonBorderButton';

interface InputChangeProps {
    arrLength: number;
    setArrLength: React.Dispatch<React.SetStateAction<number>>;
    handleChangeButton: () => void;
    showWarning: boolean
}

const InputChange: React.FC<InputChangeProps> = ({showWarning, arrLength, setArrLength, handleChangeButton }) => {
    return (
        <div className={s.changeLength}>
            <input
                type="text"
                value={arrLength}
                onChange={(e) =>
                    setArrLength(Number.isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
                }
            />
            <div className={s.buttonLength}>
                <NeonBorderButton disabled={showWarning} onClick={handleChangeButton} text={'Change length'} />
            </div>
        </div>
    );
};

export default InputChange;