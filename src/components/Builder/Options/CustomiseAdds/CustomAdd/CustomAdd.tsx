import React, {useState} from 'react';
import FlyPlaceholder from "../../../../../UIElems/FlyPlaceholder/FlyPlaceholder";
import NeonBorderButton from "../../../../../UIElems/NeonBorderButton/NeonBorderButton";
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";
import s from './CustomAdd.module.css'
import { addRandomString } from '../../../../../store/slices/builderSlice';

const CustomAdd = () => {

    const dispatch = useAppDispatch()

    const [stringName, setStringName] = useState('')
    const [stringArrValue, setStringArrValue] =useState('')
    const [stingArr, setStringArr] = useState<string[]>([])

    const addUniquePropertyToArray = (prop: string) => {
        if (!stingArr.includes(prop)) {
            setStringArr((prev: any) => [...prev, stringArrValue])}
        setStringArrValue('')
    }


    return (
        <div>
            <h3>Add random property</h3>
            <div className={s.addString}>

                <div className={s.inputValueName}>
                    <h4>Property name:</h4>
                    <FlyPlaceholder placeholder={'Give Name to property'} value={stringName} onChange={e => setStringName(e.target.value)} />
                </div>
                <div className={s.randomisedProperties}>
                    <h4>Add properties that will be randomized</h4>
                    <div className={s.randomisingInputs}>
                        <div className={s.randomisingInput}>
                            <FlyPlaceholder placeholder={'add string value to array'}
                                            value={stringArrValue}
                                            onChange={e => setStringArrValue(e.target.value)}/>
                        </div>
                        <div className={s.randomisingButton}>
                            <NeonBorderButton onClick={() => addUniquePropertyToArray(stringArrValue)}
                                              text={'Add random property to list'}/>
                        </div>
                    </div>
                </div>
                <div className={s.propertiesBucket}>
                    {(stingArr as Array<string>)
                        .map((el: string)=> <span key={el} onClick={()=> setStringArr((prev: string[]) => prev
                            .filter((elem:string)=> elem !== el)) }>{el}</span>)}
                </div>


                <div className={s.propertiesButton}>
                    <NeonBorderButton onClick={() => dispatch(addRandomString({stringArr:stingArr,valueName: stringName})) } text={'Add random property'} />
                </div>
            </div>
        </div>
    );
};

export default CustomAdd;