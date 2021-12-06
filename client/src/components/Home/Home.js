import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/header'

import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    Typography,
} from '@material-ui/core';


import './home.css'

const Home = () => {
    //document.body.style.backgroundColor= "#FFFF";
    const history = useHistory();
    //const { authData } = useAuthContext();
    const [loading, setLoading] = useState(false);


    return (
        <Container className="home" maxWidth={false} paddingLeft={false} paddingRight={false}>
            <Header />
            <Typography className="title" variant="h1" color="primary">
                Caro Online 123
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
                    onClick={ () => {
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
                    to="/rank"
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
        </Container>
    );
};

export default Home;