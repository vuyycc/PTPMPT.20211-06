import React from 'react';
import { BooleanField } from 'react-admin';

const MyBooleanField = ({ record = {}, source, ...props }) => {
    let theRecord = { ...record };

    let isActive = true;
    if (record[source] === 2) {
        isActive = false;
    }
    theRecord[source + 'Num'] = isActive;

    return (
        <BooleanField
            {...props}
            record={theRecord}
            source={source + 'Num'}
            defaultValue={isActive}
        />
    );
};

export default MyBooleanField;
