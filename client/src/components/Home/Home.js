import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/header'
import { Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { EmojiEventsRounded } from '@material-ui/icons';

import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    Avatar,
    Typography,
} from '@material-ui/core';


import './home.css'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(105),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = ({ authorized}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openListRoom, setOpenListRoom] = useState(false)

    console.log(authorized)

    if (!authorized) {
        return <Redirect to="/login" />
    }  

  
    //rank
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //list room
    const handleOpenListRoom = () => {
        setOpenListRoom(true);
    };

    const handleCloseListRoom = () => {
        setOpenListRoom(false);
    };
 

    return (
           <div>
            <Header user={user} />
            <Container className="home" maxWidth={false} paddingLeft={false} paddingRight={false} >
                <Typography className="title" variant="h1" color="primary">
                    Caro Online
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    //startIcon={<VideogameAssetRounded />}
                    // onClick={handlePlayNowClick}
                    className="btn-playnow"
                >
                    Play Now
                </Button>

                <div className="btn-group">
                    <Button
                        className="btn-room"
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => {
                            history.push("/roomlist")
                        }
                        }
                    // startIcon={<ViewListRounded />}
                    //component={RouterLink}
                    // herf="/roomlist"
                    >
                        Room
                    </Button>

                    <Button
                        className="btn-rank"
                        variant="contained"
                        color="secondary"
                        size="large"
                        //component={RouterLink}
                        onClick={handleClickOpen}
                    //startIcon={<EqualizerRounded />}
                    >
                        Rank
                    </Button>
                </div>

                <Dialog
                    open={loading}
                    //onClose={handleClosePlayNow}
                    fullWidth={true}
                    maxWidth="sm"
                    //TransitionComponent={Transition}
                    keepMounted
                >
                    <DialogContent
                        style={{
                            height: 180,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div className="loading loading07">
                            <span data-text="F">F</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="D">D</span>
                            <span data-text="I">I</span>
                            <span data-text="N">N</span>
                            <span data-text="G">G</span>
                            <span data-text=".">.</span>
                            <span data-text=".">.</span>
                            <span data-text=".">.</span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                List Rank
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <List>
                        <div className='box-list'></div>
                        <div className="container-rank">
                            <div className="rank-item">
                                <div className="index">
                                    <span> 01</span>
                                </div>
                                <div className="user-info">
                                    <Avatar alt="aaa" className="avatar" />
                                    <Typography>Vu test</Typography>
                                </div>
                                <div className="cups">
                                    <EmojiEventsRounded />
                                    <Typography>100</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="container-rank">
                            <div className="rank-item">
                                <div className="index">
                                    <span> 2</span>
                                </div>
                                <div className="user-info">
                                    <Avatar alt="aaa" className="avatar" />
                                    <Typography>Vu test</Typography>
                                </div>
                                <div className="cups">
                                    <EmojiEventsRounded />
                                    <Typography>100</Typography>
                                </div>
                            </div>
                        </div>
                       
                    </List>
                </Dialog>

                <Dialog fullScreen open={openListRoom} onClose={handleCloseListRoom} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleCloseListRoom} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>
            </Container>
           </div>
    );
};

export default Home;