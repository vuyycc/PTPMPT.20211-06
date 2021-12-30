import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { axiosAdmin } from '../../../../../api/axiosAdmin';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '470px',
    },
    inline: {
        display: 'inline',
    },
}));

const ChatsHistory = (props) => {
    const { boardId } = props;
    const classes = useStyles();
    const [listMessages, setListMessages] = useState([]);

    useEffect(() => {
        const getListMessages = async (boardId) => {
            try {
                const res = await axiosAdmin.get(`/manage/boards/${boardId}/chats`);
                console.log('list chats: ', res.data);
                setListMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getListMessages(boardId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <List className={classes.root}>
            {listMessages.map((msg) => {
                return (
                    <ListItem alignItems={'flex-start'}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={msg.sender}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {dayjs(msg.createdAt).format('DD-MM-YYYY, hh:mm:ss')}
                                    </Typography>
                                    {` - ${msg.message}`}
                                </React.Fragment>
                            }
                        />
                        <Divider variant="inset" component="li" />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ChatsHistory;
