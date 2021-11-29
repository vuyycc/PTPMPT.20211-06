import { AppBar, Avatar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import avatar from '../assets/images/1.png';

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

    const classes = useStyles();
    const history = useHistory();
    const [playerId, setPlayerId] = useState('')
    const [openProfile, setOpenProfile] = useState(false);

    useEffect(() => {
        let Playerid = localStorage.getItem("playerId")
        setPlayerId(playerId);
        
    }, [])

    const handleOpenProfile = async () => {
        setOpenProfile(true);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        history.push("/");
        window.location.reload();

    };

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography
                    className={classes.title}
                    //component={RouterLink}
                    to="/home"
                    color="inherit"
                    variant="h6"
                >
                    Caro Online
                </Typography>

                <IconButton  color="inherit">
                    <Avatar
                        alt="avatar"
                        src={avatar}
                        className={classes.avatar}
                    />
                    <Typography variant="body1">{" vu test"}</Typography>
                </IconButton>

                <IconButton className={classes.logout} onClick={handleLogout} color="inherit">
                    {/* <ExitToApp className={classes.exit} /> */}
                    <Typography variant="body1">Logout</Typography>
                </IconButton>

                {/* {openProfile && (
                    <Profile
                        //userInfo={authData.userInfo}
                        open={openProfile}
                        onClose={handleCloseProfile}
                    />
                )} */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;