import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { uploadFile } from "../firebase/firebaseApi";
import { API_URLS } from "../api/api_constants";

import axios from "../api/axiosInstance";
import { AxiosResponse } from "axios";
import { InputElement } from "../components/InputElement";

import { useNavigate } from "react-router-dom";

type registerRequest = { Name: string, Password: string, Email: string, ImageName: string };
type registerResponse = { responseMessage: string };

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const [response, setResponse] = React.useState<AxiosResponse<registerResponse>>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const item = event.target.files[0];
            setSelectedImage(item);
            setImageUrl(URL.createObjectURL(item));
        }
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const registerRequest: registerRequest = {
            Name: name,
            Password: password,
            Email: email,
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
        <section className="vh-100" >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-9">

                        <h1 className="text-white mb-4">Apply for a job</h1>

                        <form className="card">

                            {
                                errorMessage ??
                                <h4 className='text-danger mt-4'>Something went wrong: {errorMessage}</h4>
                            }

                            <div className="card-body">
                                {/* 
                                <InputElement
                                    header='Full Name'
                                    placeholder='Ivan'
                                    setValue={setName}
                                    type='text'
                                    value={name}></InputElement>

                                <hr className="mx-n3" />

                                <InputElement
                                    header='Email Address'
                                    placeholder='example@example.com'
                                    setValue={setEmail}
                                    type='email'
                                    value={email}></InputElement>

                                <hr className="mx-n3" />

                                <InputElement
                                    header='Password'
                                    placeholder='ivanovivan!123'
                                    setValue={setPassword}
                                    type='password'
                                    value={password}></InputElement> */}

                                <hr className="mx-n3" />

                                <div className="row align-items-center py-3">
                                    <div className="col-md-3 ps-5">

                                        <h6 className="mb-0">Upload CV</h6>

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

                                <hr className="mx-n3" />

                                <div className="px-5 py-4">
                                    <button onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
};

export default Register;