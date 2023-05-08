import React from 'react';
import s from './Builder.module.css'
import Options from "./Options/Options";
import Result from "./Result/Result";

const Builder = () => {
    return (
        <div className={s.builder}>
            <Options />
            <Result />
        </div>
    );
};

export default Builder;