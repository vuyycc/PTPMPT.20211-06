import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    msgTextContainer: {
        display: 'flex',
    },
    inline: {
        display: 'inline',
        fontWeight: 'bold',
    },
    listItem: {
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    listItemText: {
        margin: '0px 0px',
    },
});

const ChatMessage = ({ message }) => {
    const { sender, content } = message;
    const classes = useStyle();

    return (
        <ListItem alignItems="flex-end" className={classes.listItem}>
            <ListItemText
                className={classes.listItemText}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {sender + ': '}
                        </Typography>
                        {content}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default ChatMessage;
