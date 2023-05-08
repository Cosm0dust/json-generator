import React, {useState} from 'react';
import FlyPlaceholder from "../../../../../UIElems/FlyPlaceholder/FlyPlaceholder";
import NeonBorderButton from "../../../../../UIElems/NeonBorderButton/NeonBorderButton";
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";
import {addRandomNumber} from "../../../../../store/slices/builderSlice";
import s from './AddRandomNumber.module.css'

const AddRandomNumber = () => {
    const [minNum, setMinNum] = useState(0)
    const [maxNum, setMaxNum] = useState(0)
    const [valueName, setValueName] =useState('')

    const dispatch = useAppDispatch()

    return (
        <div>
            <h3>Add random number:</h3>
            <div className={s.addNumber}>

                <div className={s.numbersFlex}>
                    <div className={s.numbers}>
                        <span>From:</span> <input type="number" value={minNum} onChange={e => setMinNum(+e.target.value)}/>
                        <span>To:</span> <input type="number" value={maxNum} onChange={e => setMaxNum(+e.target.value)}/>
                    </div>
                    <div className={s.addNumberInput}>
                        <FlyPlaceholder placeholder={'Name value'} value={valueName}
                                        onChange={e => setValueName(e.target.value)}/>
                    </div>
                </div>
                <div className={s.addNumberButton}>
                    <NeonBorderButton onClick={() => dispatch(addRandomNumber({min:minNum, max: maxNum, valueName})) }
                                      text={'Add random number'}/>
                </div>
            </div>
        </div>
    );
};

export default AddRandomNumber;