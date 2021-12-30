import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { axiosUser } from '../../../api/axiosUser';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

const schema = yup.object().shape({
    password: yup.string().required('New password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't match"),
});

const ResetPassword = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { hashToken } = useParams();
    const history = useHistory();

    const onSubmit = async (data) => {
        const { password } = data;
        try {
            setLoading(true);

            await axiosUser.post('/auth/reset-password', {
                hashToken,
                password,
            });

            setLoading(false);

            Swal.fire({
                title: 'Reset your password successfully',
                text: 'Back to login page',
                icon: 'success',
            }).then((result) => {
                history.push('/login');
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={register}
                        name="password"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        autoFocus
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        inputRef={register}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button
                        className={classes.submit}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {loading ? (
                            <CircularProgress size={25} thickness={4} color="white" />
                        ) : (
                            'Reset your password'
                        )}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
