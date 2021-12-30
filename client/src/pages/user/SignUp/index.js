import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { axiosUser } from '../../../api/axiosUser';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(7),
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
        margin: theme.spacing(3, 0, 2),
    },
}));

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't match"),
    fullname: yup.string().required('Fullname is required'),
    email: yup.string().email('Email is not correct').required('Email is required'),
});

const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { username, password, fullname, email } = data;

            const res = await axiosUser.post('/auth/signup', {
                username,
                password,
                fullname,
                email,
            });

            if (res.status === 'success') {
                setLoading(false);

                Swal.fire({
                    icon: 'info',
                    title: "We've just send you an email",
                    text: 'Please check it to complete activate your account',
                    showConfirmButton: true,
                }).then(() => {
                    history.push('/login');
                });
            }
        } catch (error) {
            if (error.data.errors) {
                for (let err of Object.keys(error.data.errors)) {
                    setError(`${err}`, {
                        type: 'apiValidate',
                        message: error.data.errors[err],
                    });
                }
            }
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                        error={!!errors?.username}
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        fullWidth
                        required
                        name="fullname"
                        label="Full Name"
                        error={!!errors?.fullname}
                        helperText={errors?.fullname?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        required
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading ? (
                            <CircularProgress size={25} thickness={4} color="white" />
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {'Return to login'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
