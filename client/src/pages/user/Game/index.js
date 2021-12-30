import { Container, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { BOARD_SIZE } from '../../../config/board.config';
import { MAX_CUPS, MIN_CUPS, RATE_HIGH, RATE_LOW } from '../../../config/game.config';
import { useAuthContext } from '../../../context/AuthContext';
import useQuery from '../../../hooks/useQuery';
import Board from './Board';
import ChatBox from './ChatBox';
import HistoryBox from './HistoryBox';
import InfoBox from './InfoBox';
import PlayerBox from './PlayerBox';
import './styles.scss';

const filterCups = (cups) => {
    if (cups >= MAX_CUPS) {
        return MAX_CUPS;
    }

    if (cups <= MIN_CUPS) {
        return MIN_CUPS;
    }

    return cups;
};

const Game = () => {
    const { authData, resetAuthData } = useAuthContext();

    const history = useHistory();
    const query = useQuery();
    const roomId = query.get('roomId');
    const password = query.get('password');

    const [isHost, setIsHost] = useState(false);
    const [isViewer, setIsViewer] = useState(false);
    const [isWinner, setIsWinner] = useState(null);

    const [guestname, setGuestname] = useState(null);
    const [guestAvatar, setGuestAvatar] = useState('');

    const [hostname, setHostname] = useState(null);
    const [hostAvatar, setHostAvatar] = useState('');

    const [boardId, setBoardId] = useState(null);
    const [hostReady, setHostReady] = useState(false);
    const [guestReady, setGuestReady] = useState(false);
    const [hostCups, setHostCups] = useState(null);
    const [guestCups, setGuestCups] = useState(null);
    const [time, setTime] = useState(null);
    const [viewers, setViewers] = useState([]);

    const [listHistoryItem, setListHistoryItem] = useState([]);
    const [listMessages, setListMessages] = useState([]);

    const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const [turn, setTurn] = useState('X');
    const [chessman, setChessman] = useState(null);

    const [countDownKey, setCountDownKey] = useState(0);
    const [openOnline, setOpenOnline] = useState(false);

    const isChecked = useRef(false);
    let countDownRef = useRef(null);
    let configTimeRef = useRef(null);

    useEffect(() => {
        socket.emit('joinRoom', { roomId, password, cups: authData.userInfo.cups });

        socket.on('joinRoomError', (type) => {
            if (type === 'wrongRoomId') {
                alert('Invalid Room ID');
                history.push('/home');
            } else {
                // TODO: Show dialog for password
                alert('Wrong password. Show modal to type');
            }
        });

        socket.on('getRoomInfo', (roomInfo) => {
            const { host, guest, board, config } = roomInfo;
            configTimeRef.current = config.time;
            setHostname(host.username);
            setHostReady(host.isReady);
            setGuestname(guest.username);
            setGuestReady(guest.isReady);
            setBoardId(board.boardId);
            setTime(board.timeRemaining);
            setViewers(roomInfo.viewers);
            setHostAvatar(host.avatar);
            setGuestAvatar(guest.avatar);
            setHostCups(host.cups);
            setGuestCups(guest.cups);
            setSquares(board.squares);
            setListHistoryItem(board.listHistoryItem);
            setTurn(board.turn);

            if (authData.userInfo.username === host.username) {
                setChessman('X');
                setIsHost(true);
            } else if (authData.userInfo.username === guest.username) {
                setChessman('O');
            } else {
                setIsViewer(true);
            }

            if (board.boardId) {
                countDownRef.current.start();
            }
        });

        socket.on('getUpdateRoomInfo', async (roomInfo) => {
            const { host, guest, board } = roomInfo;

            setHostReady(host.isReady);
            setGuestReady(guest.isReady);
            setBoardId(board.boardId);
            setTime(board.timeRemaining);
            setHostCups(host.cups);
            setGuestCups(guest.cups);
            setSquares(board.squares);
            setListHistoryItem(board.listHistoryItem);
            setTurn('X');
            setCountDownKey((prevKey) => prevKey + 1);
            setIsWinner(null);

            if (authData.userInfo.username === host.username) {
                setChessman('X');
                setIsHost(true);
            } else if (authData.userInfo.username === guest.username) {
                setChessman('O');
            } else {
                setIsViewer(true);
            }
            if (board.boardId) {
                countDownRef.current.start();
            }
            isChecked.current = false;

            try {
                const res = await axiosUser.get(`/users/${authData.userInfo.userId}`);
                resetAuthData(res);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('newMoveChessman', (data) => {
            setSquares(data.squares);
            isChecked.current = true;
            setLastPos(data.pos);
            setListHistoryItem(data.listHistoryItem);
        });

        socket.on('resign', (data) => {
            if (authData.userInfo.username === data.winner) {
                setIsWinner(true);
            } else {
                setIsWinner(false);
            }
        });

        socket.on('drawReq', () => {
            Swal.fire({
                icon: 'question',
                title: 'Do you want to draw ?',
                showConfirmButton: true,
                showDenyButton: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit('draw', { roomId });
                } else if (result.isDenied) {
                    socket.emit('refuseDraw', { roomId });
                }
            });
        });

        socket.on('draw', () => {
            Swal.fire({
                icon: 'success',
                title: 'Draw',
                showConfirmButton: true,
            }).then(() => {
                socket.emit('getUpdateRoomInfo', roomId);
            });
        });

        socket.on('refuseDraw', () => {
            console.log('refuse draw');
        });

        return () => {
            socket.removeAllListeners();
        };

        // return () => {
        //     socket.emit('leaveRoom', roomId);
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const createBoard = async () => {
            try {
                const res = await axiosUser.post('/boards', { guestname });
                socket.emit('updateBoard', { roomId, boardId: res.data.boardId });
            } catch (error) {
                console.log(error);
            }
        };

        if (hostReady && guestReady && isHost) {
            createBoard();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostReady, guestReady]);

    useEffect(() => {
        if (isChecked.current) {
            if (calculateWinner(squares, lastPos, turn)) {
                if (turn === chessman) {
                    setIsWinner(true);
                } else {
                    setIsWinner(false);
                }
                countDownRef.current.pause();
                return;
            }
            setTurn((prevTurn) => {
                return prevTurn === 'X' ? 'O' : 'X';
            });

            if (time !== configTimeRef.current) {
                setTime(configTimeRef.current);
            }
            countDownRef.current.start();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastPos]);

    useEffect(() => {
        if (isWinner !== null) {
            if (isWinner === true) {
                let rate;
                if ((isHost && hostCups > guestCups) || (!isHost && hostCups < guestCups)) {
                    rate = RATE_LOW;
                } else {
                    rate = RATE_HIGH;
                }
                const newCups = filterCups(Math.round(Math.abs(hostCups - guestCups) * rate, 0));

                Swal.fire({
                    icon: 'success',
                    title: 'You won',
                    text: `+${newCups} cup`,
                    showConfirmButton: true,
                }).then(() => {
                    socket.emit('getUpdateRoomInfo', roomId);
                });
            } else if (chessman && !isWinner) {
                let rate;
                if ((isHost && hostCups > guestCups) || (!isHost && hostCups < guestCups)) {
                    rate = RATE_HIGH;
                } else {
                    rate = RATE_LOW;
                }
                const newCups = filterCups(Math.round(Math.abs(hostCups - guestCups) * rate, 0));

                socket.emit('finishGame', {
                    newCups,
                    roomId,
                    loser: authData.userInfo.username,
                });

                Swal.fire({
                    icon: 'warning',
                    title: 'You lose',
                    text: `-${newCups} cup`,
                    showConfirmButton: true,
                }).then(() => {
                    socket.emit('getUpdateRoomInfo', roomId);
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: `${turn} won`,
                    showConfirmButton: true,
                }).then(() => {
                    socket.emit('getUpdateRoomInfo', roomId);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWinner]);

    const handleToggleReady = useCallback(() => {
        if (isViewer) {
            return;
        }

        if (isHost) {
            setHostReady((prevHostReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevHostReady });
                return !prevHostReady;
            });
        } else {
            setGuestReady((prevGuestReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevGuestReady });
                return !prevGuestReady;
            });
        }
    }, [isViewer, roomId, isHost]);

    const handleLeaveRoom = useCallback(() => {
        if (boardId && !isViewer) {
            let rate;
            if ((isHost && hostCups > guestCups) || (!isHost && hostCups < guestCups)) {
                rate = RATE_HIGH;
            } else {
                rate = RATE_LOW;
            }
            const newCups = filterCups(Math.round(Math.abs(hostCups - guestCups) * rate, 0));

            Swal.fire({
                icon: 'info',
                title: 'Do you want to leave this room?',
                text: `If you leave, you will lose ${newCups} cup`,
                showConfirmButton: true,
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    socket.emit('leaveRoomAndLose', {
                        newCups,
                        roomId,
                    });
                    try {
                        const res = await axiosUser.get(`/users/${authData.userInfo.userId}`);
                        resetAuthData(res);
                    } catch (error) {
                        console.log(error);
                    }
                    history.push('/home');
                }
            });
        } else {
            socket.emit('leaveRoom', roomId);
            history.push('/home');
        }
    }, [
        authData.userInfo.userId,
        boardId,
        guestCups,
        history,
        hostCups,
        isHost,
        isViewer,
        resetAuthData,
        roomId,
    ]);

    const handleClickSquare = (pos) => {
        if (isViewer) return;

        if (boardId && turn === chessman) {
            if (squares[pos.x][pos.y]) return;

            const newSquares = [...squares];
            const oneRow = [...newSquares[pos.x]];
            oneRow[pos.y] = chessman;
            newSquares[pos.x] = oneRow;
            setSquares(newSquares);

            isChecked.current = true;
            setLastPos(pos);
            const newListHistoryItem = [
                ...listHistoryItem,
                {
                    username: isHost ? hostname : guestname,
                    chessman,
                    pos,
                },
            ];
            setListHistoryItem(newListHistoryItem);

            socket.emit('moveChessman', {
                roomId,
                boardId,
                chessman,
                pos,
                squares: newSquares,
                listHistoryItem: newListHistoryItem,
            });
        }
    };

    const calculateWinner = (squares, pos, chessman) => {
        const { x, y } = pos;
        // check col
        let colCount = 1;
        // check upper col
        for (let i = x - 1; i >= 0; i--) {
            if (squares[i][y] === chessman) {
                colCount++;
            } else {
                break;
            }
        }
        if (colCount >= 5) {
            return true;
        }

        // check lower col
        for (let i = x + 1; i < BOARD_SIZE; i++) {
            if (squares[i][y] === chessman) {
                colCount++;
            } else {
                break;
            }
        }
        if (colCount >= 5) {
            return true;
        }

        // check row
        let rowCount = 1;
        // check left row
        for (let j = y - 1; j >= 0; j--) {
            if (squares[x][j] === chessman) {
                rowCount++;
            } else {
                break;
            }
        }
        if (rowCount >= 5) {
            return true;
        }

        // check right row
        for (let j = y + 1; j < BOARD_SIZE; j++) {
            if (squares[x][j] === chessman) {
                rowCount++;
            } else {
                break;
            }
        }
        if (rowCount >= 5) {
            return true;
        }

        // check diag
        let diagCount = 1;
        // check upper diag
        let i = x - 1;
        let j = y - 1;
        for (i, j; i >= 0 && j >= 0; i--, j--) {
            if (squares[i][j] === chessman) {
                diagCount++;
            } else {
                break;
            }
        }
        if (diagCount >= 5) {
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y + 1;
        for (i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
            if (squares[i][j] === chessman) {
                diagCount++;
            } else {
                break;
            }
        }
        if (diagCount >= 5) {
            return true;
        }

        // check anti diag
        let antiDiagCount = 1;
        // check upper diag
        i = x - 1;
        j = y + 1;
        for (i, j; i >= 0 && j >= 0; i--, j++) {
            if (squares[i][j] === chessman) {
                antiDiagCount++;
            } else {
                break;
            }
        }
        if (antiDiagCount >= 5) {
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y - 1;
        for (i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j--) {
            if (squares[i][j] === chessman) {
                antiDiagCount++;
            } else {
                break;
            }
        }
        if (antiDiagCount >= 5) {
            return true;
        }
    };

    const handleTimeout = useCallback(() => {
        if (chessman && turn !== chessman) {
            setIsWinner(true);
        } else {
            setIsWinner(false);
        }
    }, [chessman, turn]);

    const handleResign = useCallback(() => {
        if (boardId && !isViewer) {
            Swal.fire({
                icon: 'question',
                title: 'Do you want to resign ?',
                showConfirmButton: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit('resign', { roomId });
                }
            });
        }
    }, [boardId, isViewer, roomId]);

    const handleDraw = useCallback(() => {
        if (boardId && !isViewer) {
            Swal.fire({
                icon: 'question',
                title: 'Do you want to draw ?',
                showConfirmButton: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit('drawReq', { roomId });
                }
            });
        }
    }, [boardId, isViewer, roomId]);

    const handleInvite = (username) => {
        socket.emit('invite', { roomId, reciever: username });
    };

    return (
        <Container>
            <Grid container spacing={3} className="grid-row">
                <Grid item xs={7}>
                    <div className="box row-1">
                        <PlayerBox
                            boardId={boardId}
                            isHost={isHost}
                            isViewer={isViewer}
                            hostname={hostname}
                            hostReady={hostReady}
                            guestname={guestname}
                            guestReady={guestReady}
                            hostAvatar={hostAvatar}
                            guestAvatar={guestAvatar}
                            hostCups={hostCups}
                            guestCups={guestCups}
                            time={time}
                            countDownRef={countDownRef}
                            countDownKey={countDownKey}
                            handleTimeout={handleTimeout}
                            handleToggleReady={handleToggleReady}
                            handleLeaveRoom={handleLeaveRoom}
                            handleResign={handleResign}
                            handleDraw={handleDraw}
                            handleInvite={handleInvite}
                            openOnline={openOnline}
                            setOpenOnline={setOpenOnline}
                        />
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="box row-1">
                        <InfoBox
                            viewers={viewers}
                            boardId={boardId}
                            configTimeRef={configTimeRef}
                            roomId={roomId}
                            password={password}
                            handleLeaveRoom={handleLeaveRoom}
                            handleInvite={handleInvite}
                            openOnline={openOnline}
                            setOpenOnline={setOpenOnline}
                        />
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <div className="box">
                        <Board
                            squares={squares}
                            onHandleClickSquare={handleClickSquare}
                            selectedPosition={lastPos}
                        />
                    </div>
                </Grid>

                <Grid item xs={5}>
                    <div className="box row-2">
                        <HistoryBox
                            hostname={hostname}
                            guestname={guestname}
                            listHistoryItem={listHistoryItem}
                            handleHistoryItemClick={() => {}}
                            selectedPosition={lastPos}
                        />
                    </div>

                    <div className="box row-2 mt-3">
                        <ChatBox
                            boardId={boardId}
                            roomId={roomId}
                            listMessages={listMessages}
                            setListMessages={setListMessages}
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Game;
