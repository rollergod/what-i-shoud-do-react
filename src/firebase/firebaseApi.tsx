import { storage } from "./firebaseConfiguration";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";

export const getImage = async (imageName: string): Promise<string> => {
    const imageRef = ref(storage, `/files/${imageName}`)
    const value = await getDownloadURL(imageRef);
    return value;
};

export const uploadFile = async (file: File) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
};

export const deleteFile = (file: File) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    deleteObject(storageRef);
};