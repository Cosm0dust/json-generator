import React, {useState} from 'react';
import FlyPlaceholder from "../../../../../UIElems/FlyPlaceholder/FlyPlaceholder";
import NeonBorderButton from "../../../../../UIElems/NeonBorderButton/NeonBorderButton";
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";
import s from './AddRandomBoolean.module.css'
import {addRandomBoolean} from "../../../../../store/slices/builderSlice";

const AddRandomBoolean = () => {

    const [booleanName, setBooleanName] = useState('')

    const dispatch = useAppDispatch()

    return (
        <div>
            <h3>Add random boolean</h3>
            <div className={s.addBoolean}>
                <div className={s.booleanInput}>
                    <FlyPlaceholder placeholder={'Name boolean'} value={booleanName}
                                    onChange={e => setBooleanName(e.target.value)}/>
                </div>
                <div className={s.booleanButton}>
                    <NeonBorderButton onClick={() => dispatch(addRandomBoolean({valueName: booleanName})) }
                                      text={'Add true or false value'}/>
                </div>
            </div>
        </div>
    );
};

export default AddRandomBoolean;