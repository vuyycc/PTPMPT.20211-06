import { Avatar, Typography } from '@material-ui/core';
import { EmojiEventsRounded } from '@material-ui/icons';
import React from 'react';
import './styles.scss';

const PlayerInfo = ({ isHost = false, username, avatar, cups, ready }) => {
    return (
        <div className={`player-info ${isHost ? ready && 'ready-left' : ready && 'ready-right'}`}>
            <Typography variant="body1" className="host-guest">
                {isHost ? 'HOST' : 'GUEST'}
            </Typography>
            {username ? (
                <div className="user-group">
                    <Avatar alt={username} src={avatar} className="avatar" />
                    <Typography variant="body2">
                        {username} - {cups} <EmojiEventsRounded fontSize="small" />
                    </Typography>
                </div>
            ) : (
                <div className="user-group">
                    <Avatar className="avatar" />
                    <Typography variant="body2">Waiting is happiness ...</Typography>
                </div>
            )}
        </div>
    );
};

export default PlayerInfo;
