import { Avatar, Button, Typography } from '@material-ui/core';
import { EmojiEventsRounded, HistoryRounded, PagesOutlined } from '@material-ui/icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import './styles.scss';

const History = ({ userInfo, onClose }) => {
    const [boardList, setBoardList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await axiosUser.get('/boards');

                setBoardList(res.data.boardList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBoards();
    }, []);

    const handleReviewClick = (boardId) => {
        onClose();
        history.push(`/board/${boardId}`);
    };

    return (
        <div className="history">
            <div className="history-title">
                <HistoryRounded />
                <Typography variant="h5"> History </Typography>
            </div>

            <div className="history-list">
                {boardList.map((board) => (
                    <div
                        className={`history-box ${
                            board.winner === userInfo.username
                                ? 'win'
                                : board.winner === null
                                ? 'draw'
                                : 'lose'
                        }`}
                        key={board.boardId}
                    >
                        <div className="user-group">
                            {board.hostname === userInfo.username ? (
                                <Avatar
                                    className="avatar"
                                    alt={userInfo.username}
                                    src={userInfo.avatar}
                                />
                            ) : (
                                <Typography variant="body1">{board.hostname}</Typography>
                            )}
                        </div>

                        <div className="history-info">
                            <div className="time">
                                <Typography variant="body1">
                                    {dayjs(board.finishedAt).format('DD/MM/YYYY')}
                                </Typography>
                            </div>
                            <div>
                                {board.winner === userInfo.username
                                    ? 'win'
                                    : board.winner === null
                                    ? 'draw'
                                    : 'lose'}
                            </div>
                            <div className="cup">
                                <EmojiEventsRounded />
                                <Typography variant="body1">{board.cups}</Typography>
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => handleReviewClick(board.boardId)}
                                startIcon={<PagesOutlined />}
                            >
                                Review
                            </Button>
                        </div>

                        <div className="user-group">
                            {board.guestname === userInfo.username ? (
                                <Avatar
                                    className="avatar"
                                    alt={userInfo.username}
                                    src={userInfo.avatar}
                                />
                            ) : (
                                <Typography variant="body1">{board.guestname}</Typography>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
