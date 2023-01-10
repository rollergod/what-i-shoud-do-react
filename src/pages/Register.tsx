import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { uploadFile } from "../firebase/firebaseApi";
import { API_URLS } from "../api/api_constants";

import axios from "../api/axios";
import { AxiosResponse } from "axios";

type registerRequest = { Name: string, Password: string, Email: string, ImageName: string };
type registerResponse = { responseMessage: string };

const Register = () => {

    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [imageUrl, setImageUrl] = React.useState<string>("");
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const [response, setResponse] = React.useState<AxiosResponse<registerResponse>>(null);

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
        } catch (error) {
            console.log(error);
        }

        uploadFile(selectedImage); //загрузка изображения в firebase
    };

    return (
        <section className="vh-100" >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-9">

                        <h1 className="text-white mb-4">Apply for a job</h1>

                        <form className="card">
                            <div className="card-body">

                                <div className="row align-items-center pt-4 pb-3">
                                    <div className="col-md-3 ps-5">

                                        <h6 className="mb-0">Full name</h6>

                                    </div>
                                    <div className="col-md-9 pe-5">

                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            type="text"
                                            className="form-control form-control-lg"
                                        />

                                    </div>
                                </div>

                                <hr className="mx-n3" />

                                <div className="row align-items-center py-3">
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
                                </div>

                                <hr className="mx-n3" />

                                <div className="row align-items-center py-3">
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
                                </div>

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
                                        {/* //TODO : переделать стили */}

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
            </div >
        </section >

    )
};

export default Register;