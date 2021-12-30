import React from 'react';
import {
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput,
} from 'react-admin';
import MyBooleanField from '../MyBooleanField';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name or email" source="searchText" alwaysOn />
    </Filter>
);

const UserList = (props) => {
    return (
        <List {...props} pagination={false} filters={<UserFilter />}>
            <Datagrid rowClick={'show'}>
                <TextField source="userId" />
                <TextField source="username" />
                <TextField source="fullname" />
                <TextField source="email" />
                <TextField source="total" />
                <TextField source="wins" />
                <TextField source="cups" />
                <MyBooleanField label="Active" source="status" />
                <EditButton basePath="/users" />
                <DeleteWithConfirmButton basePath="/users" />
            </Datagrid>
        </List>
    );
};

export default UserList;
