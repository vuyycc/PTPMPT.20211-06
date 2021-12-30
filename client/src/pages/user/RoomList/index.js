import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { AddBoxRounded, MeetingRoomRounded } from '@material-ui/icons';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import './styles.scss';

const RoomList = () => {
    const { register, handleSubmit, control, errors, setError, reset } = useForm({
        defaultValues: {
            password: '',
            time: '45',
            roomId: '',
        },
    });

    console.log(errors);

    const { authData } = useAuthContext();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openJoinForm, setOpenJoinForm] = useState(false);
    const [openPasswordForm, setOpenPasswordForm] = useState(false);

    const columns = useMemo(
        () => [
            {
                name: 'RoomID',
                selector: 'roomId',
                sortable: true,
            },
            {
                name: 'Password',
                selector: 'password',
            },
            {
                name: 'Host',
                selector: 'hostname',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Slot',
                selector: 'slot',
                sortable: true,
            },
            {
                name: 'Viewer',
                selector: 'viewer',
                sortable: true,
            },
        ],
        [],
    );

    useEffect(() => {
        socket.emit('roomList');

        socket.on('getRoomList', (roomList) => {
            setLoading(true);
            let updatedRoomList = [];
            for (let roomId in roomList) {
                updatedRoomList.push({
                    roomId,
                    password: roomList[roomId].config.password ? 'Yes' : 'No',
                    hostname: roomList[roomId].host.username,
                    status: roomList[roomId].board.boardId ? 'Playing' : 'Waiting',
                    slot: roomList[roomId].guest.username ? '2/2' : '1/2',
                    viewer: roomList[roomId].viewers.length,
                });
            }
            console.log('roomlist ma ta ', updatedRoomList);
            setRoomList(updatedRoomList);
            setLoading(false);
        });

        socket.on('joinRoom', ({ roomId, password }) => {
            history.push(`/room?roomId=${roomId}&password=${password}`);
        });

        socket.on('joinRoomError', (type) => {
            console.log(type);

            if (type === 'wrongRoomId') {
                setError('roomId', {
                    type,
                    message: "Can't find room with this RoomID. Please try again!",
                });
            } else {
                setError('password', {
                    type,
                    message: 'Wrong password. Please try again!',
                });
            }
        });

        return () => {
            socket.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenCreateForm = () => {
        setOpenCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setOpenCreateForm(false);
        reset({
            password: '',
            time: '45',
            roomId: '',
        });
    };

    const handleSubmitCreateGame = (data) => {
        const config = {
            password: data.password ? data.password : null,
            time: data.time,
        };
        socket.emit('createRoom', {
            cups: authData.userInfo.cups,
            config,
        });
        handleCloseCreateForm();
    };

    const handleOpenJoinForm = () => {
        setOpenJoinForm(true);
    };

    const handleCloseJoinForm = () => {
        setOpenJoinForm(false);
        reset({
            password: '',
            roomId: '',
        });
    };

    const handleSubmitJoinGame = (data) => {
        socket.emit('checkRoom', {
            roomId: data.roomId,
            password: data.password ? data.password : null,
        });
    };

    const handleClosePasswordForm = () => {
        setOpenPasswordForm(false);
        reset({
            password: '',
        });
    };

    const handleSubmitPasswordGame = (data) => {
        socket.emit('checkRoom', {
            roomId: selectedRoomId,
            password: data.password ? data.password : null,
        });
    };

    const handleRowClick = (row) => {
        console.log(row);

        if (row.password === 'Yes') {
            setSelectedRoomId(row.roomId);
            setOpenPasswordForm(true);
        } else {
            history.push(`/room?roomId=${row.roomId}&password=${null}`);
        }
    };

    return (
        <div className="room-list">
            <Paper className="container">
                <div className="header">
                    <Typography color="primary" variant="h2" className="title">
                        Room
                    </Typography>
                    <div className="btn-group">
                        <Button
                            onClick={handleOpenCreateForm}
                            variant="contained"
                            color="primary"
                            startIcon={<AddBoxRounded />}
                            className="create-btn"
                        >
                            Create
                        </Button>
                        <Button
                            onClick={handleOpenJoinForm}
                            variant="contained"
                            color="primary"
                            startIcon={<MeetingRoomRounded />}
                            className="join-btn"
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className="content">
                    <DataTable
                        columns={columns}
                        data={roomList}
                        progressPending={loading}
                        onRowClicked={handleRowClick}
                        pointerOnHover
                        highlightOnHover
                        noDataComponent="There are rooms to display"
                    />
                </div>
            </Paper>

            <Dialog
                fullWidth={true}
                open={openCreateForm}
                onClose={handleCloseCreateForm}
                aria-labelledby="create-game-form"
            >
                <DialogTitle id="create-game-form">Create Game</DialogTitle>
                <DialogContent>
                    <InputLabel>Password (Optional)</InputLabel>
                    <TextField
                        margin="normal"
                        name="password"
                        inputRef={register}
                        autoComplete="off"
                        fullWidth
                    />
                    <InputLabel>Time</InputLabel>
                    <Controller
                        control={control}
                        name="time"
                        fullWidth
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                defaultValue="45"
                            >
                                <MenuItem value="15">15</MenuItem>
                                <MenuItem value="30">30</MenuItem>
                                <MenuItem value="45">45</MenuItem>
                                <MenuItem value="60">60</MenuItem>
                                <MenuItem value="75">75</MenuItem>
                                <MenuItem value="90">90</MenuItem>
                            </Select>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitCreateGame)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={openJoinForm}
                onClose={handleCloseJoinForm}
                aria-labelledby="join-game-form"
            >
                <DialogTitle id="join-game-form">Join Game</DialogTitle>
                <DialogContent>
                    <InputLabel>RoomID</InputLabel>
                    <TextField
                        margin="normal"
                        name="roomId"
                        inputRef={register}
                        autoComplete="off"
                        error={!!errors?.roomId}
                        helperText={errors?.roomId?.message}
                        required={true}
                        fullWidth
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                        margin="normal"
                        name="password"
                        inputRef={register}
                        autoComplete="off"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseJoinForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitJoinGame)} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={openPasswordForm}
                onClose={handleClosePasswordForm}
                aria-labelledby="password-form"
            >
                <DialogTitle id="password-form">Password</DialogTitle>
                <DialogContent>
                    <InputLabel>Password</InputLabel>
                    <TextField
                        margin="normal"
                        name="password"
                        inputRef={register}
                        autoComplete="off"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePasswordForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitPasswordGame)} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RoomList;
