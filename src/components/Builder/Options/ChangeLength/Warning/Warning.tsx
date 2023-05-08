import React, { useState } from 'react';
import s from './Warning.module.css';
import NeonBorderButton from '../../../../../UIElems/NeonBorderButton/NeonBorderButton';

interface WarningProps {
    setAccept: React.Dispatch<React.SetStateAction<boolean>>;
    setForbidWarning: React.Dispatch<React.SetStateAction<boolean>>;
    forbidWarning: boolean;
    handleClickWarning: () => void;
}

const Warning: React.FC<WarningProps> = ({setAccept, setForbidWarning, forbidWarning, handleClickWarning,}) => {
    return (
        <div className={s.warning}>
            <p>Are you sure? this will delete previous array!</p>
            <div className={s.warningRadio}>
                <label className={s.container}>
                    Yes
                    <input
                        type="radio"
                        name="access"
                        value="true"
                        onChange={(event) => setAccept(!!event.target.value)}
                    />
                    <span className={s.checkmark}></span>
                </label>
                <label className={s.container}>
                    No
                    <input
                        type="radio"
                        name="access"
                        value=""
                        onChange={(event) => setAccept(!!event.target.value)}
                    />
                    <span className={s.checkmark}></span>
                </label>
            </div>
            <label className={s.checkLabel}>
                <span>Never show this message again</span>
                <input
                    type="checkbox"
                    checked={forbidWarning}
                    onChange={() => setForbidWarning(prev=> !prev)}
                />
                <span className={s.checkmark}></span>
            </label>
            <div className={s.warningButton}>
                <NeonBorderButton  onClick={handleClickWarning} text={'save the answer'} />
            </div>
        </div>
    );
};

export default Warning;