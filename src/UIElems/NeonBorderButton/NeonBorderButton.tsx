import React, {MouseEvent} from 'react';

interface NeonBorderButtonProps {
    onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
    text: string;
    disabled?: boolean
}

const NeonBorderButton = ({ onClick, text, disabled } : NeonBorderButtonProps) => {
    return (
        <>
            <button onClick={onClick} disabled={disabled} className='neonBorderButton'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {text}
            </button>
        </>
    );
};

export default NeonBorderButton;