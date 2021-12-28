import { AppBar, Avatar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import selecUser from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux'

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
    const [userCurrent, setUserCurrent] = useState({});

    useEffect(() => {
        let user = localStorage.getItem('user');
        setUserCurrent(JSON.parse(user));
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user");
        history.push("/login");
        window.location.reload();

    };

    return (
        <AppBar position="static">
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
                        src={userCurrent ? userCurrent.avatar : ""}
                        className={classes.avatar}
                    />
                    <Typography variant="body1">{userCurrent ? userCurrent.username : ""}</Typography>
                </IconButton>

                <IconButton className={classes.logout} onClick={handleLogout} color="inherit">
                    {/* <ExitToApp className={classes.exit} /> */}
                    {
                        userCurrent ? <Typography variant="body1">Logout</Typography> : <Typography variant="body1">LogIn</Typography>
                    }
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