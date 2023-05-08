import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../typescripUtils/rtk-ts";
import s from './Bucket.module.scss'
import PlusBucket from "./PlusBucket/PlusBucket";
import DeleteBucket from "./DeleteBucket/DeleteBucket";



const Bucket = () => {
    const propertiesArr = useAppSelector(state => state.builder.propertiesArr)

    return (
        <div className={s.buttonsBucket}>
            <h2>What to add?</h2>
           <PlusBucket arr = {propertiesArr}/>
            <h2 style={{color: 'red'}}>What to delete?</h2>
            <DeleteBucket arr = {propertiesArr}/>
        </div>
    );
};

export default Bucket;