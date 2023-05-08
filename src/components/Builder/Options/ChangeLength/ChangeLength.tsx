import React, { useState} from 'react';
import s from './ChangeLength.module.css'
import {useAppDispatch, useAppSelector} from "../../../../typescripUtils/rtk-ts";
import {changeLength} from "../../../../store/slices/builderSlice";
import InputChange from "./inputChange/InputChange";
import Warning from "./Warning/Warning";

const ChangeLength = () => {

    const arr = useAppSelector(state => state.builder.workingArr)

    const [forbidWarning, setForbidWarning] = useState(false)
    const [accept, setAccept] = useState(false)
    const [showWarning, setShowWarning] =useState(false)

    const dispatch = useAppDispatch()

    const [ arrLength, setArrLength] = useState<number>(0)

    const handleChangeButton = () => {
      if(forbidWarning){
          dispatch(changeLength(
              {length: arrLength}
          ))
      } else if(!forbidWarning){
          if(arr.length === 0){
              dispatch(changeLength(
                  {length: arrLength}
              ))
          } else{
              setShowWarning(prev => true)
          }

        }


    }

    const handleClickWarning =() =>{

        if(accept) {
                dispatch(changeLength(
                {length: arrLength}
                 ))
                setShowWarning(prev=>false)
        }
        setShowWarning(prev =>false)
    }

    return (
        <div className={s.changeLengthContainer}>
            <h2>Change Length</h2>
            <div className={s.changeContainer}>
            <InputChange showWarning={showWarning} arrLength={arrLength} setArrLength={setArrLength} handleChangeButton={handleChangeButton}/>

                {showWarning &&
                    <Warning setAccept={setAccept} setForbidWarning={setForbidWarning} forbidWarning={forbidWarning}
                             handleClickWarning={handleClickWarning}/>
                }
            </div>
        </div>
    );
};

export default ChangeLength;