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
import { axiosUser } from '../../../api/axiosUser';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../../../config/auth.config';
import { FaFacebookSquare } from 'react-icons/fa';
import { useAuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    googleBtn: {
        height: '50px',
        width: '280px',
        margin: theme.spacing(1),
    },
    facebookBtn: {
        height: '50px',
        width: '280px',
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
        boxShadow: ' rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
        padding: '0px',
        borderRadius: '2px',
        border: '1px solid transparent',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: ' Roboto, sans-serif',
        backgroundColor: 'rgb(255, 255, 255)',

        '&:hover': {
            cursor: 'pointer',
            opacity: 0.9,
        },
    },
    fbIcon: {
        marginRight: '16px',
        marginLeft: '10px',
        fontSize: '20px',
        color: '#4267B2',
    },
    separator: {
        marginTop: theme.spacing(1),
    },
}));

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const { onLogin } = useAuthContext();
    const history = useHistory();
    const classes = useStyles();
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { username, password } = data;
            const res = await axiosUser.post('/auth/login', {
                username,
                password,
            });
            setLoading(false);

            if (res.status === 'success') {
                onLogin(res.data);
                history.push('/home');
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
            console.log(error);
            setLoading(false);
        }
    };

    const onGoogleSuccess = async (googleRes) => {
        try {
            setLoading(true);
            const apiRes = await axiosUser.get('/auth/google', {
                headers: {
                    access_token: googleRes.accessToken,
                },
            });

            if (apiRes.status === 'success') {
                setLoading(false);

                onLogin(apiRes.data);
                history.push('/home');
            }
        } catch (error) {
            setLoading(false);

            if (error.data.errors) {
                for (let err of Object.keys(error.data.errors)) {
                    setError(`${err}`, {
                        type: 'apiValidate',
                        message: error.data.errors[err],
                    });
                }
            }
            console.log(error);
        }
    };

    const onGoogleFailure = (googleRes) => {
        console.log(googleRes);
    };

    const onFacebookSuccess = async (facebookRes) => {
        try {
            setLoading(true);
            console.log(facebookRes);
            const apiRes = await axiosUser.get('/auth/facebook', {
                headers: {
                    access_token: facebookRes.accessToken,
                },
            });

            if (apiRes.status === 'success') {
                onLogin(apiRes.data);
                history.push('/home');
            }
        } catch (error) {
            setLoading(false);

            if (error.data.errors) {
                for (let err of Object.keys(error.data.errors)) {
                    setError(`${err}`, {
                        type: 'apiValidate',
                        message: error.data.errors[err],
                    });
                }
            }
            console.log(error);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
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
                        autoComplete="current-password"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
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
                            'Login'
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot-password" variant="body2">
                                Forgot your password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="body1" className={classes.separator}>
                    Or
                </Typography>
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure}
                    cookiePolicy="single_host_origin"
                    className={classes.googleBtn}
                />
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    fields="name,email,picture"
                    callback={onFacebookSuccess}
                    icon={<FaFacebookSquare className={classes.fbIcon} />}
                    cssClass={classes.facebookBtn}
                />
            </Paper>
        </Container>
    );
};

export default Login;
