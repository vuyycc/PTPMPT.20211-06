import { Button, CircularProgress, Typography } from '@material-ui/core';
import { VerifiedUserRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import { useAuthContext } from '../../../context/AuthContext';
import './styles.scss';

const ActivateAccount = () => {
    const { authData, resetAuthData } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const { hashToken } = useParams();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                await axiosUser.get(`auth/verify-account/${hashToken}`);

                if (Object.keys(authData).length !== 0) {
                    const userInfo = await axiosUser.get(`users/${authData.userInfo.userId}`);
                    resetAuthData(userInfo);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        verifyAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="activate-container">
            <div className="activate">
                <Typography color="primary" variant="h1">
                    <VerifiedUserRounded className="title" />
                </Typography>
                {loading ? (
                    <CircularProgress size={25} thickness={4} color="white" />
                ) : (
                    <div className="content">
                        <Typography variant="body1">
                            Your Account has been activated successfully
                        </Typography>
                        <Button to="/home" component={Link} variant="contained" color="primary">
                            Return Home
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivateAccount;
