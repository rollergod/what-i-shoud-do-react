import { getDownloadURL, ref, uploadBytesResumable, listAll } from "firebase/storage";
import React from "react";

import { storage } from "./firebase";

import { AiOutlineUpload } from 'react-icons/ai';


const ImagePage = () => {
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

    const getImages = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        // Create a reference under which you want to list
        // const listRef = ref(storage, 'files/');
        const imageRef = ref(storage, `/files/${selectedImage.name}`)

        getDownloadURL(imageRef).then(url => setImage(url));
    }

    const uploadFile = (file: File) => {
        if (!file) return;

        const storageRef = ref(storage, `/files/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => console.log(url));
            });
    };

    return (
        <>
            {/* {
                image && (
                    <ul>
                        <li>Name : {selectedImage.name}</li>
                        <li>Type : {selectedImage.type}</li>
                        <li>Size : {selectedImage.size}</li>
                    </ul>
                )
            } */}

            <form>
                <input type="file" name="file" onChange={onImageChange} />
                {/* <img src={image} alt="preview image" /> */}
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={getImages}>GetImages</button>
            </form>

            <h3>Uploaded {progress}</h3>

            <div className="container">
                <figure className="image-container">
                    <img id="chosen-image" src={image} />
                    <figcaption id="file-name">
                        {selectedImage.name}
                    </figcaption>
                </figure>

                <input onChange={onImageChange} type="file" id="upload-button" accept="image/*" />
                <label htmlFor="upload-button" className="labeltest">
                    <AiOutlineUpload className="test"></AiOutlineUpload>
                    Choose A Photo
                </label>
            </div>

        </>
    )
};

export default ImagePage;