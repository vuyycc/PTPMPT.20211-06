import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ChatMessage from '../ChatMessage';

const useStyles = makeStyles({
    historyContainer: {
        overflow: 'auto',
        height: '280px',
    },
});

const MessagesHistory = ({ messages }) => {
    const listMessages = messages;
    const classes = useStyles();

    return (
        <div className={classes.historyContainer}>
            {listMessages.map((msg, index) => {
                return <ChatMessage key={index} message={msg} />;
            })}
        </div>
    );
};

export default MessagesHistory;
