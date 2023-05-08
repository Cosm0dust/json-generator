import React from 'react';
import s from './DeleteBucket.module.css'
import {deleteProperty} from "../../../../../store/slices/builderSlice";
import {useAppDispatch} from "../../../../../typescripUtils/rtk-ts";

interface DeleteBucketProps{
    arr: string[]
}

const DeleteBucket: React.FC<DeleteBucketProps> = ({arr}) => {
    const dispatch = useAppDispatch()

    return (
        <div className={s.deleteBuckets}>
            {arr.map((value) => <button key={value} onClick={() =>dispatch(deleteProperty({prop: value})) }>delete {value}</button>)}
        </div>
    );
};

export default DeleteBucket;