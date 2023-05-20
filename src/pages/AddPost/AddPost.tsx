import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, useParams } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useAppSelector } from '../../hoc/hook';
import { selectIsAuth } from '../../store/slices/authSlice';
import { Button, Paper, TextField } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import { uploadFile } from '../../firebase/firebaseApi';
import { deleteFile } from '../../firebase/firebaseApi';
import { getImage } from '../../firebase/firebaseApi';

export const AddPost = () => {
    const { id } = useParams(); // post id
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuth)

    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [selectedImage, setSelectedImage] = React.useState<File>(null);
    const [text, setText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [imageName, setImageName] = React.useState<string>('');

    const inputFileRef = React.useRef(null);

    const isEditing = Boolean(id);

    const getUrlImage = async (image: string) => {
        getImage(image)
            .then(res => {
                console.log(res);
                setImageUrl(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        if (id) {
            axiosInstance.get(`/posts/${id}`)
                .then(({ data }) => {
                    setText(data.data.text);
                    setTitle(data.data.title);
                    setImageName(data.data.iamge);
                    getUrlImage(data.data.image);
                })
        }
    }, [])

    const handleChangeFile = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const item = event.target.files[0];
            setSelectedImage(item);
            setImageUrl(URL.createObjectURL(item));
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('');
        setSelectedImage(null);
        inputFileRef.current.value = '';
    }

    const onSubmit = async () => {
        try {
            console.log(selectedImage);
            if (selectedImage !== null) {
                await uploadFile(selectedImage);
                await getImage(selectedImage.name)
            }

            const fields = {
                text,
                title,
                image: selectedImage !== null ? selectedImage.name : imageName,
            };

            console.log('FIELDS', fields);

            const { data } = isEditing
                ? await axiosInstance.put(`/posts/${id}`, fields) // TODO: передалть URL
                : await axiosInstance.post('/posts', fields);

            const _id = isEditing ? id : data.data.id;

            navigate(`/posts/${_id}`)

        } catch (error) {
            console.warn(error);
            alert('Ошибка создания статьи')
        }
    }

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
        }
    }, []);

    return (
        <Paper style={{ padding: 30 }}>
            <Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
                Загрузить изображение
            </Button>
            <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
            {imageUrl && (
                <>
                    <Button variant='contained' color='error' onClick={onClickRemoveImage}>
                        Удалить изображение
                    </Button>
                    <img className={styles.image} src={imageUrl} alt='UploadedImage' />
                </>
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size='large' variant='contained'>
                    {isEditing ? 'Сохранить' : 'Опубликовать'}
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    )
}