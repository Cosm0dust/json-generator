import React, {useState} from 'react';
import s from './Slot.module.css'
import {
    useDeleteArrayMutation,
    useDeleteSlotMutation, useGetArraysQuery,
    useGetJsonByIdQuery,
    useSaveArrayMutation
} from "../../../../store/API/saved.api";
import {buildObject, ISlot, RandomProps} from "../../../../typescripUtils/model";
import {useAppDispatch, useAppSelector} from "../../../../typescripUtils/rtk-ts";
import {setWorkingArray} from "../../../../store/slices/builderSlice";

interface SlotProps {
    slotObj: ISlot;
    currentSlot: number;
    setCurrentSlot: (prev: number)=> void;
    setChosenName: (prev:string) => void
}

const Slot = ({slotObj, currentSlot, setCurrentSlot, setChosenName}: SlotProps) => {
    const arr = useAppSelector(state => state.builder.workingArr)
    const [chosenSlot, setChosenSlot] = useState(false)

    const {data, error, isLoading} = useGetJsonByIdQuery(slotObj.id)

    const{data: arry, error: erry, isLoading: load }= useGetArraysQuery(slotObj.id)

    const [deleteObj] =useDeleteSlotMutation()
    const [saveArray] = useSaveArrayMutation()
    const [deleteArray]= useDeleteArrayMutation()



    const dispatch = useAppDispatch()

    const handleWorkArr = () => {
        setChosenSlot(true)
        setCurrentSlot(slotObj.id )
        setChosenName(slotObj.slotName)

        dispatch(setWorkingArray({savedArr: arry.length ? arry : []}))
    }



    const updateSlot = () => {
        if(arry.length){
            for(let i = arry[0].id; i <= arry[arry.length -1].id; i++){
                deleteArray(i)
            }
            for(let i = 0; i< arr.length; i++ ){
                saveArray({
                    ...arr[i],
                    slotId: slotObj.id,
                })
            }
        }

        for(let i = 0; i < arr.length; i++ ){
            saveArray({
                ...arr[i],
                slotId: slotObj.id,
            })
        }

        setChosenSlot(prev =>false)


    }

    console.log(currentSlot)
    return (
        <div className={s.slot} key={slotObj.id}>
            <div className={s.text} onClick={() => handleWorkArr()}><span >{slotObj.slotName}</span></div>

            <div className={s.buttons}>
                <div className={s.updateB}>{chosenSlot && (currentSlot === slotObj.id) &&
                    <button onClick={() => updateSlot()}>U</button>}</div>
                <div className={s.editB}>
                    <button onClick={() => deleteObj(slotObj.id)}>X</button>
                </div>
            </div>
        </div>
    );
};

export default Slot;