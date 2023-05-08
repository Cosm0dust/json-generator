import React from 'react';

import AddCustomDate from "./AddCustomDate/AddCustomDate";
import AddRandomNumber from "./AddRandomNumber/AddRandomNumber";
import AddRandomBoolean from "./AddRandomBoolean/AddRandomBoolean";
import CustomAdd from './CustomAdd/CustomAdd';

const CustomiseAdds = () => {

    return (
        <div className='customAdd'>
            <h2>Customize adds</h2>
            <AddCustomDate />
            <AddRandomNumber />
            <AddRandomBoolean />
            <CustomAdd />
        </div>
    );
};

export default CustomiseAdds;