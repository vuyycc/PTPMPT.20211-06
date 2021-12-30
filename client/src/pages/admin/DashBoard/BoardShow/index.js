import React from 'react';
import { DateField, Show, Tab, TabbedShowLayout, TextField } from 'react-admin';
import ChatsHistory from './ChatsHistory';

const BoardShow = (props) => {
    console.log('Usershow: ', props);
    return (
        <Show title={'User detail'} {...props}>
            <TabbedShowLayout>
                <Tab label={'Board'}>
                    <TextField source="boardId" />
                    <TextField source="hostname" />
                    <TextField source="guestname" />
                    <TextField source="status" />
                    <TextField source="winner" />
                    <DateField source="createdAt" showTime={true} />
                    <DateField source="finishedAt" showTime={true} />
                </Tab>
                <Tab label={'Chats history'}>
                    <ChatsHistory boardId={props.id} />
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};

export default BoardShow;
