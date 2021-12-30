import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    Typography,
} from '@material-ui/core';
import { EqualizerRounded, VideogameAssetRounded, ViewListRounded } from '@material-ui/icons';
import React, { forwardRef, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import './styles.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
    const history = useHistory();
    const { authData } = useAuthContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.on('joinRoom', ({ roomId, password }) => {
            history.push(`/room?roomId=${roomId}&password=${password}`);
        });

        return () => {
            socket.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePlayNowClick = () => {
        socket.emit('playNow', { cups: authData.userInfo.cups });
        setLoading(true);
    };

    const handleClosePlayNow = () => {
        socket.emit('stopPlayNow');
        setLoading(false);
    };

    return (
        <Container className="home">
            <Typography className="title" variant="h1" color="primary">
                Caro Online
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<VideogameAssetRounded />}
                onClick={handlePlayNowClick}
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
                    startIcon={<ViewListRounded />}
                    component={RouterLink}
                    to="/room-list"
                >
                    Room
                </Button>

                <Button
                    className="btn-rank"
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/rank"
                    startIcon={<EqualizerRounded />}
                >
                    Rank
                </Button>
            </div>

            <Dialog
                open={loading}
                onClose={handleClosePlayNow}
                fullWidth={true}
                maxWidth="sm"
                TransitionComponent={Transition}
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
                    <Button onClick={handleClosePlayNow} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Home;
