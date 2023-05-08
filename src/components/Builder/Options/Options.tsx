import React from 'react';
import s from './Options.module.css'
import ChangeLength from "./ChangeLength/ChangeLength";
import Bucket from "./AddBucket/Bucket";
import CustomiseAdds from "./CustomiseAdds/CustomiseAdds";

const Options = () => {
    return (
        <div className={s.options}>
            <h2>What to add to JSON?</h2>
            <ChangeLength />
            <Bucket />
            <CustomiseAdds />
        </div>
    );
};

export default Options;