import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { uploadFile } from "../../firebase/firebaseApi";
import { API_URLS } from "../../api/api_constants";

import axios from "../../api/axiosInstance";
import { AxiosResponse } from "axios";
import { InputElement } from "../../components/InputElement";

import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Paper, Typography } from "@mui/material";

import styles from './Register.module.scss';

type registerRequest = { Name: string, Password: string, Email: string, ImageName: string };
type registerResponse = { responseMessage: string };

interface IFormInputs {
    name: string,
    email: string,
    password: string,
    imageUrl: string
};

const Register = () => {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm<IFormInputs>({
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const [response, setResponse] = React.useState<AxiosResponse<registerResponse>>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const item = event.target.files[0];
            setSelectedImage(item);
            setImageUrl(URL.createObjectURL(item));
            console.log(imageUrl);
        }
    };

    const onSubmit: SubmitHandler<IFormInputs> = async (values) => {
        const registerRequest: registerRequest = {
            Name: values.name,
            Password: values.password,
            Email: values.email,
            ImageName: selectedImage.name,
        };

        try {
            await axios.post(API_URLS.REGISTER, registerRequest)
                .then((resp) => {
                    setResponse(resp.data)
                });

            uploadFile(selectedImage);
            navigate('/', { replace: true });
        } catch (error) {
            setErrorMessage(error.response.data.title);
        }
    };

    return (
        <Paper>
            <Typography classes={{ root: styles.title }} variant="h5">
                Регистрация аккаунта
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>

                {
                    errorMessage ??
                    <h4 className='text-danger mt-4'>Something went wrong: {errorMessage}</h4>
                }

                <div className={styles.root}>

                    <InputElement
                        name='name'
                        header='Full Name'
                        placeHolder='Ivan'
                        type='text'
                        register={{
                            ...register('name', {
                                required: `Field name is required`,
                                minLength: {
                                    value: 2,
                                    message: `Minimum 2 symbols`,
                                }
                            })
                        }}
                        errors={errors}
                    />

                    <hr className="mx-n3" />

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

                    <div className="row align-items-center py-3">
                        <div className="col-md-3 ps-5">

                            <Typography variant="h6">
                                Profile image
                            </Typography>

                        </div>
                        <div className="col-md-9 pe-5">

                            <input
                                onChange={onImageChange}
                                className="form-control form-control-lg"
                                accept="image/*"
                                id="formFileLg"
                                type="file"
                            />
                            <img id="chosen-image" className="w-25 h-25" src={imageUrl} />

                        </div>
                    </div>

                    <div className="px-5 py-4">
                        <Button className={styles.enter} disabled={!isValid} type="submit" variant='outlined' fullWidth>
                            Зарегистрироваться
                        </Button>
                    </div>

                </div>
            </form>
        </Paper>
    )
};

export default Register;