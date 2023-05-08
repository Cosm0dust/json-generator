import React, {useEffect, useState} from 'react';
import s from './Result.module.scss'
import {useAppDispatch, useAppSelector} from "../../../typescripUtils/rtk-ts";
import NeonBorderButton from "../../../UIElems/NeonBorderButton/NeonBorderButton";
import {
    useDeleteSlotMutation, useGetArraysQuery,
    useGetJsonByIdQuery,
    useGetSlotsQuery,
    useSaveArrayMutation,
    useSaveSlotMutation
} from '../../../store/API/saved.api';
import { ISlot} from "../../../typescripUtils/model";
import {addRandomBoolean, setWorkingArray} from "../../../store/slices/builderSlice";
import Slot from "./Slot/Slot";
import FlyPlaceholder from "../../../UIElems/FlyPlaceholder/FlyPlaceholder";

const Result = () => {
    const arr = useAppSelector(state => state.builder.workingArr)
    const [showOne, setShowOne] = useState(false)
    const [slotName, setSlotName] = useState('')
    const [randomNum, setRandomNum] = useState( Math.floor(Math.random() * 1000))

    const [currentSlot, setCurrentSlot] = useState<number>(0)
    const [chosenName, setChosenName] = useState<string>('')


    const {data, error, isLoading} = useGetSlotsQuery()






    const [saveSlot] = useSaveSlotMutation()

    const [saveArray] = useSaveArrayMutation()



    const handleSave =  () => {
        setRandomNum(prev => Math.floor(Math.random() * 1000))

        saveSlot(
          {
              id: randomNum,
              slotName: slotName || `slot`
          }
      )
        for(let i = 0; i< arr.length; i++ ){
            saveArray({
                ...arr[i],
                objId: arr[i].id,
                slotId: randomNum,
            })
        }
    }






    return (
        <div className={s.result}>

            <div className={s.stick}>
                <h2>Result</h2>
                <div className={s.savedResult}>
                    <h3>saved result</h3>
                    <div className={s.spoiler}>
                        {
                            (data as Array<ISlot>)?.map(el =>
                                <Slot key={el.id}
                                      slotObj = {el}
                                      currentSlot = {currentSlot}
                                      setCurrentSlot={setCurrentSlot}
                                      setChosenName={setChosenName}
                                />
                            )
                        }
                    </div>
                </div>

                <div className={s.saveArr}>
                    <div className={s.spoilerInput}>
                        <FlyPlaceholder placeholder={'Name result'} value={slotName}
                                        onChange={e => setSlotName(e.target.value)}/>
                    </div>
                    <div className={s.spoilerButton}>
                        <NeonBorderButton onClick={() => handleSave() } text={'Save result'}/>
                    </div>
                </div>

                <div className={s.stick__buttons}>
                    <div>
                        <NeonBorderButton onClick={() => setShowOne(true)} text={'Only one element'}/>
                    </div>
                    <div>
                        <NeonBorderButton onClick={() => setShowOne(false)} text={'Whole array'}/>
                    </div>
                </div>


                <div>
                    {chosenName && <p>ChosenArr: <span>{chosenName}</span></p>}
                    <p>{showOne ? JSON.stringify(arr[0]) : JSON.stringify(arr)}</p>
                </div>
        </div>


        </div>
    );
};

export default Result;