import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axiosInstance from '../api/axiosInstance';
import { API_URLS } from '../api/api_constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getImage } from '../firebase/firebaseApi';
import { InputElement } from '../components/InputElement';

import { SubmitHandler, useForm } from 'react-hook-form';
import { setCredentials } from '../store/slices/authSlice';

type loginRequest = { email: string, password: string };

interface IFormInputs {
    email: string,
    password: string
};

const Login = () => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<IFormInputs>({
        mode: 'onChange'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            console.log(error);
            alert('Не удалось авторизироваться')
        }
    };

    return (
        <section className="vh-100" >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-9">

                        <h1 className="text-white mb-4">Apply for a job</h1>

                        <form className="card" onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">

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

                                <div className="px-5 py-4">
                                    <input type='submit' value='Login' className="btn btn-primary btn-lg"></input>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login; 