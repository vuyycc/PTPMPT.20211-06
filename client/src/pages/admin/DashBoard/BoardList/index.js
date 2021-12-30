import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';

const BoardList = (props) => {
    return (
        <List {...props} pagination={false}>
            <Datagrid rowClick={'show'}>
                <TextField source={'boardId'} />
                <TextField source={'hostname'} />
                <TextField source={'guestname'} />
                <TextField source={'winner'} />
                <DateField source={'createdAt'} showTime={true} />
                <DateField source={'finishedAt'} showTime={true} />
                <TextField source={'cups'} />
            </Datagrid>
        </List>
    );
};

export default BoardList;
