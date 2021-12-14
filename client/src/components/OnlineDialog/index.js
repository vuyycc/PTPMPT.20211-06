import {
    Button,
    Dialog,
    DialogContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Slide,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { forwardRef, useEffect, useState } from 'react';
import socket from '../../commons/socket';
import { useAuthContext } from '../../context/AuthContext';
import BadgeAvatar from '../BadgeAvatar';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: 600,
        margin: '50px auto',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    paper: {
        height: '80vh',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OnlineDialog = ({ openOnline, handleCloseOnline, handleInvite, isInvite = false }) => {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);
    const { authData } = useAuthContext();
    useEffect(() => {
        socket.on('getOnlineUserRes', (data) => {
            const formatedOnlineUser = [];
            for (let username in data) {
                if (username !== authData.userInfo.username) {
                    formatedOnlineUser.push({
                        username,
                        avatar: data[username].avatar,
                    });
                }
            }

            setUserList(formatedOnlineUser);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (openOnline) {
            socket.emit('getOnlineUserReq');
        }
    }, [openOnline]);

    return (
        <Dialog
            open={openOnline}
            onClose={handleCloseOnline}
            fullWidth={true}
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogContent>
                <div className={classes.paper}>
                    <Typography color="primary" className={classes.title} variant="h4">
                        Online User
                    </Typography>
                    <List dense className={classes.list}>
                        {userList.map((user) => {
                            return (
                                <ListItem key={user.username} button>
                                    <ListItemAvatar>
                                        <BadgeAvatar alt={user.username} src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${user.username}`} />
                                    {isInvite && (
                                        <Button onClick={() => handleInvite(user.username)}>
                                            Invite
                                        </Button>
                                    )}
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OnlineDialog;
