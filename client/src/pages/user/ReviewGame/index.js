import { Container, Grid, Typography } from '@material-ui/core';
import {
    CalendarTodayRounded,
    EmojiEventsRounded,
    GamesRounded,
    ScheduleRounded,
    SportsEsportsRounded,
    StarsRounded,
} from '@material-ui/icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import { BOARD_SIZE } from '../../../config/board.config';
import { useAuthContext } from '../../../context/AuthContext';
import Board from '../Game/Board';
import ChatBox from '../Game/ChatBox';
import HistoryBox from '../Game/HistoryBox';
import PlayerInfo from '../Game/PlayerBox/PlayerInfo';
import './styles.scss';

const ReviewGame = () => {
    const { boardId } = useParams();
    const { authData } = useAuthContext();
    const [boardInfo, setBoardInfo] = useState({});
    const [hostInfo, setHostInfo] = useState({});
    const [guestInfo, setGuestInfo] = useState({});
    const [historyList, setHistoryList] = useState([]);
    const [chat, setChat] = useState([]);
    const [squares, setSquares] = useState(
        Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill(null)),
    );
    const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const resBoard = await axiosUser.get(`/boards/${boardId}`);
                const resHistoryList = await axiosUser.get(`/moving-history?boardId=${boardId}`);
                const resChat = await axiosUser.get(`/chat?boardId=${boardId}`);

                if (resBoard.data.boardInfo.hostname === authData.userInfo.username) {
                    const resGuest = await axiosUser.get(
                        `/users/get-by-username/${resBoard.data.boardInfo.guestname}`,
                    );
                    setHostInfo({
                        username: authData.userInfo.username,
                        avatar: authData.userInfo.avatar,
                        cups: authData.userInfo.cups,
                    });
                    setGuestInfo({
                        username: resBoard.data.boardInfo.guestname,
                        avatar: resGuest.data.userInfo.avatar,
                        cups: resGuest.data.userInfo.cups,
                    });
                } else {
                    const resHost = await axiosUser.get(
                        `/users/get-by-username/${resBoard.data.boardInfo.hostname}`,
                    );
                    setHostInfo({
                        username: resBoard.data.boardInfo.hostname,
                        avatar: resHost.data.userInfo.avatar,
                        cups: resHost.data.userInfo.cups,
                    });
                    setGuestInfo({
                        username: authData.userInfo.username,
                        avatar: authData.userInfo.avatar,
                        cups: authData.userInfo.cups,
                    });
                }

                let formatedSquares = Array(BOARD_SIZE)
                    .fill(null)
                    .map(() => Array(BOARD_SIZE).fill(null));

                const formatedHistoryList = resHistoryList.data.historyList.map((history) => {
                    const historyItem = {
                        pos: {
                            x: +history.position.split('-')[0],
                            y: +history.position.split('-')[1],
                        },
                        sender: history.sender,
                    };

                    const chessman =
                        history.sender === resBoard.data.boardInfo.hostname ? 'X' : 'O';

                    formatedSquares[historyItem.pos.x][historyItem.pos.y] = chessman;
                    return historyItem;
                });

                setBoardInfo(resBoard.data.boardInfo);
                setSquares(formatedSquares);
                setHistoryList(formatedHistoryList);
                setSelectedPosition(formatedHistoryList[formatedHistoryList.length - 1].pos);
                setChat(
                    resChat.data.chat.map((msg) => ({
                        sender: msg.sender,
                        content: msg.message,
                        isMine: false,
                    })),
                );
            } catch (error) {
                console.log(error);
            }
        };

        fetchBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardId]);

    const handleHistoryItemClick = (index) => {
        let updatedSquares = Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill(null));

        historyList.slice(0, index + 1).forEach((history) => {
            const chessman = history.sender === boardInfo.hostname ? 'X' : 'O';
            updatedSquares[history.pos.x][history.pos.y] = chessman;
        });

        setSelectedPosition(historyList[index].pos);
        setSquares(updatedSquares);
    };

    return (
        <Container>
            <Grid container spacing={3} className="grid-row">
                <Grid item xs={7}>
                    <div className="box row-1">
                        <div className="player-box">
                            <PlayerInfo
                                isHost={true}
                                username={hostInfo.username}
                                avatar={hostInfo.avatar}
                                cups={hostInfo.cups}
                                ready={false}
                            />

                            <Typography variant="h5" className="vs">
                                VS
                            </Typography>

                            <PlayerInfo
                                username={guestInfo.username}
                                avatar={guestInfo.avatar}
                                cups={guestInfo.cups}
                                ready={false}
                            />
                        </div>
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="box row-1">
                        <div className="game-info">
                            <div className="wrapper header">
                                <SportsEsportsRounded />
                                <Typography>Game Info</Typography>
                            </div>
                            <div className="winner-info">
                                <div className="wrapper">
                                    <StarsRounded />
                                    <Typography>
                                        Winner:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {boardInfo.winner === null ? 'Draw' : boardInfo.winner}
                                        </span>{' '}
                                    </Typography>
                                </div>

                                <div className="wrapper">
                                    <EmojiEventsRounded />
                                    <Typography>
                                        Cups:{' '}
                                        <span style={{ fontWeight: 'bold' }}>{boardInfo.cups}</span>{' '}
                                    </Typography>
                                </div>

                                <div className="wrapper">
                                    <CalendarTodayRounded />
                                    <Typography>
                                        Start:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {dayjs(boardInfo.createdAt).format(
                                                'HH:mm - DD/MM/YYYY',
                                            )}
                                        </span>{' '}
                                    </Typography>
                                </div>

                                <div className="wrapper">
                                    <CalendarTodayRounded />
                                    <Typography>
                                        Finish:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {dayjs(boardInfo.finishedAt).format(
                                                'HH:mm - DD/MM/YYYY',
                                            )}
                                        </span>{' '}
                                    </Typography>
                                </div>

                                <div className="wrapper">
                                    <ScheduleRounded />
                                    <Typography>
                                        Time:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {dayjs(boardInfo.finishedAt).diff(
                                                dayjs(boardInfo.createdAt),
                                                'seconds',
                                                true,
                                            )}
                                            s
                                        </span>{' '}
                                    </Typography>
                                </div>

                                <div className="wrapper">
                                    <GamesRounded />
                                    <Typography>
                                        Move :{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {historyList?.length}
                                        </span>{' '}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <div className="box">
                        <Board
                            squares={squares}
                            onHandleClickSquare={() => {}}
                            selectedPosition={selectedPosition}
                        />
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="box row-2">
                        <HistoryBox
                            hostname={hostInfo.username}
                            guestname={guestInfo.username}
                            listHistoryItem={historyList}
                            handleHistoryItemClick={handleHistoryItemClick}
                            selectedPosition={selectedPosition}
                        />
                    </div>

                    <div className="box row-2 mt-3">
                        <ChatBox boardId={boardId} listMessages={chat} setListMessages={setChat} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReviewGame;
