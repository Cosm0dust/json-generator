import React, {useState} from 'react';
import DateInput from "../../../../../UIElems/DateInput/DateInput";
import NeonBorderButton from "../../../../../UIElems/NeonBorderButton/NeonBorderButton";
import s from './AddCustomDate.module.css'
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";
import {addRandomDate} from "../../../../../store/slices/builderSlice";
import {formateDateString} from "../../../../../utils/utils";
import FlyPlaceholder from "../../../../../UIElems/FlyPlaceholder/FlyPlaceholder";

const AddCustomDate = () => {

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [dateName, setDateName] =useState('')

    const dispatch = useAppDispatch()

    return (
        <div>
            <h3>Add random date:</h3>
            <div className={s.addDate}>
                <div className={s.dates}>
                    <div>
                        <div>From:</div>
                        <div><DateInput value={fromDate} onChange={e => setFromDate(e.target.value)}/></div>
                    </div>
                    <div>
                        <div>To:</div>
                        <div>
                            <DateInput value={toDate} onChange={e => setToDate(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <FlyPlaceholder placeholder={'Name date'} value={dateName} onChange={e=> setDateName(e.target.value)}/>
                </div>
                <div className={s.dateButton}>
                    <NeonBorderButton
                        onClick={() =>dispatch(addRandomDate({
                            from: formateDateString(fromDate), to: formateDateString(toDate), dateName: dateName && 'date',
                            format:'dd.mm.yyyy'
                        })) }
                        text={'Add random date'}/>
                </div>
            </div>
        </div>
    );
};

export default AddCustomDate;