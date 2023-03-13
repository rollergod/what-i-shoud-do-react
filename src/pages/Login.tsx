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

type loginRequest = { email: string, password: string };
type loginResponse = { responseMessage: string, accessToken: string, imageName: string };

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [response, setResponse] = React.useState<AxiosResponse<loginResponse>>(null); //TODO: как сделать нормально работающий тип?

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

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

                    dispatch(setCredentials({
                        email: email,
                        password: password,
                        token: resp.data.accessToken,
                        imageRef: imageUrl
                    }));

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

                        <form className="card">
                            <div className="card-body">

                                {/* <div className="row align-items-center py-3">
                                    <div className="col-md-3 ps-5">

                                        <h6 className="mb-0">Email address</h6>

                                    </div>
                                    <div className="col-md-9 pe-5">

                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="example@example.com"
                                        />

                                    </div>
                                </div> */}

                                <InputElement type={'email'} value={email} setValue={setEmail}></InputElement>

                                <hr className="mx-n3" />

                                {/* <div className="row align-items-center py-3">
                                    <div className="col-md-3 ps-5">

                                        <h6 className="mb-0">Password</h6>

                                    </div>
                                    <div className="col-md-9 pe-5">

                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            className="form-control"
                                        />

                                    </div>
                                </div> */}

                                <InputElement type={'password'} value={password} setValue={setPassword}></InputElement>


                                <hr className="mx-n3" />

                                <div className="px-5 py-4">
                                    <button onClick={handleSubmit} className="btn btn-primary btn-lg">Login</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div >
        </section >
    );
};


export default Login; 