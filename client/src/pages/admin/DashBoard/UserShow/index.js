import React from 'react';
import {
    Datagrid,
    DateField,
    ReferenceManyField,
    Show,
    Tab,
    TabbedShowLayout,
    TextField,
} from 'react-admin';
import MyBooleanField from '../MyBooleanField';
import MyTextField from '../MyTextField';
import PostShowActions from './UserShowActions';

const UserShow = (props) => {
    console.log('Usershow: ', props);
    return (
        <Show title={'User detail'} {...props} actions={<PostShowActions />}>
            <TabbedShowLayout>
                <Tab label="User profile">
                    <TextField source="userId" />
                    <TextField source="username" />
                    <TextField source="fullname" />
                    <TextField source="email" />
                    <DateField label="Created at" source="createdAt" showTime={true} />
                    <TextField source="total" />
                    <TextField source="wins" />
                    <TextField source="cups" />
                    <MyBooleanField label="Active" addLabel={true} source="status" />
                    <MyTextField label="Role" addLabel={true} source="role" />
                </Tab>
                <Tab label="History" path="boards">
                    <ReferenceManyField reference="boards" target="userId" addLabel={false}>
                        <Datagrid rowClick={'show'}>
                            <TextField source="boardId" />
                            <TextField source="hostname" />
                            <TextField source="guestname" />
                            <TextField source="winner" />
                            <DateField source="createdAt" showTime={true} />
                            <DateField source="finishedAt" showTime={true} />
                            <TextField source="cups" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};

export default UserShow;
