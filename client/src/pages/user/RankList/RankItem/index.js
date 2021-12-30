import { Avatar, Typography } from '@material-ui/core';
import { EmojiEventsRounded } from '@material-ui/icons';
import React from 'react';
import './styles.scss';

const RankItem = ({ user, index, isUser = false }) => {
    return (
        <div className="rank-item">
            <div className="index">
                {isUser && `Your Place`} <span> {index + 1}</span>
            </div>
            <div className="user-info">
                <Avatar alt={user.username} src={user.avatar} className="avatar" />
                <Typography>{user.username}</Typography>
            </div>
            <div className="cups">
                <EmojiEventsRounded />
                <Typography>{user.cups}</Typography>
            </div>
        </div>
    );
};

export default RankItem;
