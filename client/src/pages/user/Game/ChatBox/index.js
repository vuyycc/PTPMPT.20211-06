import { Button, TextField } from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import socket from '../../../../commons/socket';
import { useAuthContext } from '../../../../context/AuthContext';
import MessagesHistory from './MessagesHistory';
import './styles.scss';

const ChatBox = ({ boardId, roomId, listMessages, setListMessages }) => {
    const { register, handleSubmit, reset } = useForm();
    const { authData } = useAuthContext();

    useEffect(() => {
        socket.on('newMessage', (data) => {
            console.log('newMessage', data);
            setListMessages((prevListMessages) =>
                prevListMessages.concat({
                    sender: data.sender,
                    content: data.content,
                    isMine: false,
                }),
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSendMyMessage = (data) => {
        const { inputMessage } = data;
        console.log(inputMessage);
        const message = {
            sender: authData.userInfo.username,
            content: inputMessage,
            isMine: true,
        };
        setListMessages(listMessages.concat(message));
        socket.emit('sendMessage', { boardId, content: message.content, roomId });
        reset({});
    };

    return (
        <div className="chat-box">
            <MessagesHistory messages={listMessages} />
            {roomId && (
                <form className="chat-form" noValidate onSubmit={handleSubmit(onSendMyMessage)}>
                    <TextField
                        fullWidth
                        name="inputMessage"
                        inputRef={register}
                        variant="outlined"
                        size="small"
                        label="Message"
                        color="secondary"
                        style={{
                            marginRight: '5px',
                        }}
                        autoComplete="off"
                    />
                    <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        endIcon={<SendOutlined />}
                    >
                        Send
                    </Button>
                </form>
            )}
        </div>
    );
};

export default ChatBox;
