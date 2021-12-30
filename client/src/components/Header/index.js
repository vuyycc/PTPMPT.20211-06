import { AppBar, Avatar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import avatar from '../../assets/images/avatar.jpg';
import { useAuthContext } from '../../context/AuthContext';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: 'auto',
        textDecoration: 'none',
    },
    avatar: {
        marginRight: 10,
        height: 27,
        width: 27,
    },
    exit: {
        marginRight: 10,
    },
    logout: {
        marginLeft: 20,
    },
}));

const Header = () => {
    const { authData, onLogout } = useAuthContext();
    const classes = useStyles();

    const [openProfile, setOpenProfile] = useState(false);

    const handleOpenProfile = async () => {
        setOpenProfile(true);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    className={classes.title}
                    component={RouterLink}
                    to="/home"
                    color="inherit"
                    variant="h6"
                >
                    Caro Online
                </Typography>

                <IconButton onClick={handleOpenProfile} color="inherit">
                    <Avatar
                        alt="avatar"
                        src={authData.userInfo.avatar ? authData.userInfo.avatar : avatar}
                        className={classes.avatar}
                    />
                    <Typography variant="body1">{authData.userInfo.username}</Typography>
                </IconButton>

                <IconButton className={classes.logout} onClick={handleLogout} color="inherit">
                    <ExitToApp className={classes.exit} />
                    <Typography variant="body1">Logout</Typography>
                </IconButton>

                {openProfile && (
                    <Profile
                        userInfo={authData.userInfo}
                        open={openProfile}
                        onClose={handleCloseProfile}
                    />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
