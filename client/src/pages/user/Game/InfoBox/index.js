import { Avatar, Button, Typography } from '@material-ui/core';
import {
    ExitToAppRounded,
    FingerprintRounded,
    MailRounded,
    TimerRounded,
    VpnKeyRounded,
} from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import OnlineDialog from '../../../../components/OnlineDialog';
import './styles.scss';

const InfoBox = ({
    roomId,
    password,
    configTimeRef,
    viewers,
    handleLeaveRoom,
    handleInvite,
    openOnline,
    setOpenOnline,
}) => {
    return (
        <div className="info-box">
            <div className="room-info">
                <div className="wrapper">
                    <FingerprintRounded fontSize="small" />
                    <Typography>{roomId}</Typography>
                </div>
                <div className="group-info">
                    <div className="wrapper">
                        <TimerRounded fontSize="small" />
                        <Typography>{configTimeRef.current}s</Typography>
                    </div>
                    <div className="wrapper">
                        <VpnKeyRounded fontSize="small" />
                        <Typography>{password !== 'null' ? password : 'Not Available'}</Typography>
                    </div>
                </div>
            </div>

            <div className="grid-container">
                <div className="viewer-list">
                    <Typography>Viewer</Typography>
                    {viewers.length !== 0 ? (
                        <AvatarGroup max={7}>
                            {viewers.map((viewer, index) => {
                                return <Avatar key={index} src={viewer.avatar} />;
                            })}
                        </AvatarGroup>
                    ) : (
                        'Waiting ....'
                    )}
                </div>
                <div className="button-group">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenOnline(true)}
                        startIcon={<MailRounded />}
                        size="small"
                    >
                        Invite
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLeaveRoom}
                        startIcon={<ExitToAppRounded />}
                        size="small"
                    >
                        Leave
                    </Button>

                    <OnlineDialog
                        handleCloseOnline={() => setOpenOnline(false)}
                        handleInvite={handleInvite}
                        openOnline={openOnline}
                        isInvite={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoBox;
