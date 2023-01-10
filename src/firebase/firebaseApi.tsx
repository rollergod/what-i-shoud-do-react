import React from "react";
import { storage } from "./firebaseConfiguration";
import { getDownloadURL, ref, uploadBytesResumable, listAll } from "firebase/storage";

export const getImage = async (imageName: string): Promise<string> => {
    const imageRef = ref(storage, `/files/${imageName}`)
    const value = await getDownloadURL(imageRef);
    return value;
}

export const uploadFile = (file: File) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
};
