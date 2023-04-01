import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axiosInstance from '../../api/axiosInstance';
import { API_URLS } from '../../api/api_constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../../firebase/firebaseApi';
import { InputElement } from '../../components/InputElement';

import { SubmitHandler, useForm } from 'react-hook-form';
import { setCredentials } from '../../store/slices/authSlice';

import styles from './Login.module.scss';
import { Button, Container, Paper, Typography } from '@mui/material';

type loginRequest = { email: string, password: string };

interface IFormInputs {
    email: string,
    password: string
};

const Login = () => {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm<IFormInputs>({
        mode: 'onChange'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onSubmit: SubmitHandler<IFormInputs> = async (values) => {
        console.log(values);

        const loginRequest: loginRequest = {
            email: values.email,
            password: values.password
        };

        try {
            await axiosInstance.post(API_URLS.LOGIN, loginRequest, {
                withCredentials: true,
            })
                .then(async resp => {

                    localStorage.setItem('jwt', resp.data.accessToken);
                    const imageUrl = await getImage(resp.data.imageName);

                    dispatch(setCredentials({
                        token: resp.data.accessToken,
                        imageRef: imageUrl
                    }));

                    navigate('/');
                })
        } catch (error) {
            if (error.response.data.status === 404)
                setErrorMessage('User with current credentials was not found')
            alert('Не удалось авторизироваться')
        }
    };

    return (
        <Paper>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.root}>

                    <InputElement
                        name='email'
                        header='Email Address'
                        placeHolder='example@example.com'
                        type='email'
                        register={{
                            ...register('email', {
                                required: `Field email is required`,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })
                        }}
                        errors={errors}
                    />

                    <hr className="mx-n3" />

                    <InputElement
                        name='password'
                        header='Password'
                        placeHolder='ivanovivan!123'
                        type='password'
                        register={{
                            ...register('password', {
                                required: `Field password is required`,
                                minLength: {
                                    value: 5,
                                    message: `Minimum 5 symbols`,
                                }
                            })
                        }}
                        errors={errors}
                    />

                    <hr className="mx-n3" />

                    {
                        errorMessage &&
                        <Typography sx={{ color: 'red', fontSize: 20 }}>{errorMessage}</Typography>
                    }

                    <div className="px-5 py-4">
                        <Button className={styles.enter} disabled={!isValid} type="submit" variant='outlined' fullWidth>
                            Войти
                        </Button>
                    </div>

                </div>
            </form>
        </Paper>
    );
};

export default Login; 