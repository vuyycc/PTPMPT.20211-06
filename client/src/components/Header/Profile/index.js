import { Avatar, Dialog, DialogContent, Link, Slide, Typography } from '@material-ui/core';
import {
    AccountCircleRounded,
    DateRangeRounded,
    EmailRounded,
    EmojiEventsRounded,
    MoodRounded,
    SportsEsportsRounded,
    StarBorderRounded,
    VerifiedUserRounded,
} from '@material-ui/icons';
import React, { forwardRef } from 'react';
import avatar from '../../../assets/images/avatar.jpg';
import History from '../History';
import dayjs from 'dayjs';
import './styles.scss';
import { axiosUser } from '../../../api/axiosUser';
import { toast, ToastContainer } from 'react-toastify';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ userInfo, open, onClose }) => {
    const handleSendEmail = async () => {
        try {
            await axiosUser.get('/auth/send-email-verify');
            toast.success('Send email succefully. Please check your email!', {
                position: 'top-right',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted
        >
            {
                <DialogContent className="content">
                    <div className="avatar-group">
                        <Avatar
                            className="avatar"
                            alt="avatar"
                            src={userInfo.avatar ? userInfo.avatar : avatar}
                        />
                        <Typography variant="h5">{userInfo.username}</Typography>
                    </div>

                    <div className="user-info">
                        <div className="user-info-group">
                            <AccountCircleRounded className="info-icon" />
                            <Typography variant="body1">{userInfo.fullname} </Typography>
                        </div>
                        <span className="dash">-</span>
                        <div className="user-info-group">
                            <EmailRounded className="info-icon" />
                            <Typography variant="body1">{userInfo.email} </Typography>
                        </div>
                        <span className="dash">-</span>
                        <div className="user-info-group">
                            <DateRangeRounded className="info-icon" />
                            <Typography variant="body1">
                                {' '}
                                {dayjs(userInfo.createdAt).format('MM/YYYY')}{' '}
                            </Typography>
                        </div>
                        <span className="dash">-</span>
                        <div className="user-info-group">
                            <VerifiedUserRounded className="info-icon" />
                            {userInfo.status === 1 ? (
                                <Typography variant="body1">Activated</Typography>
                            ) : (
                                <Typography variant="body1">
                                    Not activated yet.Click
                                    <Link style={{ cursor: 'pointer' }} onClick={handleSendEmail}>
                                        {' '}
                                        here{' '}
                                    </Link>
                                    to send email
                                </Typography>
                            )}
                        </div>
                    </div>

                    <div className="user-statistic">
                        <div className="user-statistic-box">
                            <EmojiEventsRounded className="user-statistic-icon" />
                            <Typography variant="body1">{userInfo.cups} cups</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <SportsEsportsRounded className="user-statistic-icon" />
                            <Typography variant="body1">{userInfo.total} games</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <MoodRounded className="user-statistic-icon" />
                            <Typography variant="body1">{userInfo.wins} wins</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <StarBorderRounded className="user-statistic-icon" />
                            <Typography variant="body1">
                                {userInfo.total
                                    ? Math.round((userInfo.wins / userInfo.total) * 100)
                                    : 0}{' '}
                                %
                            </Typography>
                        </div>
                    </div>

                    <History userInfo={userInfo} onClose={onClose} />
                </DialogContent>
            }
            <ToastContainer />
        </Dialog>
    );
};

export default Profile;
