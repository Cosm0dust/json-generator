import React from 'react';

import s from './PlusBucket.module.css'
import {
    addFullName, addHobbiesArray,
    addId, addRandomBirthDate,
    addRandomFullName,
    addSomethId,
    addSomething
} from "../../../../../store/slices/builderSlice";
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";

interface AddBucketProps{
    arr: string[]
}


const PlusBucket: React.FC<AddBucketProps>  = ({arr}) => {

    const dispatch = useAppDispatch()

    return (
        <div className={s.addBucket}>
            <button onClick={() => dispatch(addSomething({arg: 'names', argName: 'name'}))}>Name</button>
            <button onClick={() => dispatch(addSomething({arg: 'surnames', argName: 'surname'}))}>Surname</button>
            {
                arr.includes('name') && arr.includes('surname') && <button onClick={() => dispatch(addFullName())}>Fullname(from name and surname)</button>
            }
            <button onClick={() => dispatch(addSomethId({smth:'names'}))}>SomethId</button>
            <button onClick={() => dispatch(addRandomFullName())}>random Fullname</button>
            <button onClick={() => dispatch(addId())}>Id</button>
            <button onClick={() => dispatch(addHobbiesArray())}>Hobbies</button>
            <button onClick={() => dispatch(addRandomBirthDate())}>Add random birthdate</button>
        </div>
    );
};

export default PlusBucket;