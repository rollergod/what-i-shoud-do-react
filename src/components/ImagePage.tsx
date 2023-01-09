import React from "react";

import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import { getImage, uploadFile } from "../firebase/ImageApi";

const ImagePage = () => {
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [progress, setProgress] = React.useState<number>(0);
    const [image, setImage] = React.useState<string>("");
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const item = event.target.files[0];
            // setImage(URL.createObjectURL(item));
            setSelectedImage(item);
            setImage(URL.createObjectURL(item));
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        uploadFile(selectedImage);
    }

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
                                        <img id="chosen-image" className="w-25 h-25" src={image} />
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

export default ImagePage;

{/* <>
            {
                image && (
                    <ul>
                        <li>Name : {selectedImage.name}</li>
                        <li>Type : {selectedImage.type}</li>
                        <li>Size : {selectedImage.size}</li>
                    </ul>
                )
            }

            <form>

                <input type="file" name="file" onChange={onImageChange} />
                 <img src={image} alt="preview image" /> 
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={getImages}>GetImages</button>
            </form>

            <h3>Uploaded {progress}</h3>

            <div classNameNameName="container">
                <figure classNameNameName="image-container">
                    <img id="chosen-image" src={image} />
                    <figcaption id="file-name">
                        {selectedImage?.name}
                    </figcaption>
                </figure>

                <input onChange={onImageChange} type="file" id="upload-button" accept="image/*" />
                <label htmlFor="upload-button" classNameNameName="labeltest">
                    <AiOutlineUpload classNameNameName="test"></AiOutlineUpload>
                    Choose A Photo
                </label>
            </div>

        </>  */}