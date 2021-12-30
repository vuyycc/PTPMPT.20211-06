import React from 'react';
import { TextField } from 'react-admin';

const MyTextField = ({ record = {}, source, ...props }) => {
    let theRecord = { ...record };

    let role = 'User';
    if (record[source] === 1) {
        role = 'Admin';
    }
    theRecord[source + 'Text'] = role;

    return <TextField record={theRecord} source={source + 'Text'} {...props} />;
};

export default MyTextField;
