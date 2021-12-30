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
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { axiosUser } from '../../../../api/axiosUser';

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
    email: yup.string().email('Email is not correct').required('Email is required'),
});

const ForgotPassword = () => {
    const classes = useStyles();

    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axiosUser.post('auth/send-email-forgot', { email: data.email });
            toast.success('Send email succefully. Please check your email!', {
                position: 'top-right',
            });
        } catch (error) {
            setError('email', {
                type: 'email',
                message: error.data.message,
            });
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        inputRef={register}
                        name="email"
                        label="Email"
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                        required
                        autoFocus
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        className={classes.submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        {loading ? (
                            <CircularProgress size={25} thickness={4} color="white" />
                        ) : (
                            'Send me password reset email'
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
                <ToastContainer />
            </Paper>
        </Container>
    );
};

export default ForgotPassword;
