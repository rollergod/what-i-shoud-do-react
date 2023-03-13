import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axiosInstance from '../api/axiosInstance';
import { API_URLS } from '../api/api_constants';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { getImage } from '../firebase/firebaseApi';
import { InputElement } from '../components/InputElement';

import { useForm } from 'react-hook-form';

type loginRequest = { email: string, password: string };
type loginResponse = { responseMessage: string, accessToken: string, imageName: string };

const Login = () => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [response, setResponse] = React.useState<AxiosResponse<loginResponse>>(null); //TODO: как сделать нормально работающий тип?

    const onSubmit = async () => {
        const loginRequest: loginRequest = {
            email: email,
            password: password
        };

        try {
            await axiosInstance.post(API_URLS.LOGIN, loginRequest, {
                withCredentials: true,
            })
                .then(async resp => {

                    localStorage.setItem('jwt', resp.data.accessToken);
                    const imageUrl = await getImage(resp.data.imageName);
                    localStorage.setItem('imageRef', imageUrl);
                    localStorage.setItem('userName', resp.data.userName);

                    // dispatch(setCredentials({
                    //     email: email,
                    //     password: password,
                    //     token: resp.data.accessToken,
                    //     imageRef: imageUrl
                    // }));

                    navigate('/');
                })
        } catch (error) {
            console.log(error);
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
                                    register={register}
                                    header='Email Address'
                                    type='email'
                                    value={email}
                                    setValue={setEmail}
                                    placeholder='example@example.com'></InputElement>

                                <div>
                                    {errors?.EmailAddress && <p>{errors.EmailAddress.message.toString() || "Error"}</p>}
                                </div>

                                <hr className="mx-n3" />

                                <InputElement
                                    register={register}
                                    header='Password'
                                    type='password'
                                    value={password}
                                    setValue={setPassword}
                                    placeholder='ivanovivan!123'></InputElement>

                                <div>
                                    {errors?.Password && <p>{errors.Password.message.toString() || "Error"}</p>}
                                </div>

                                <hr className="mx-n3" />

                                <div className="px-5 py-4">
                                    <input type='submit' className="btn btn-primary btn-lg"></input>
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