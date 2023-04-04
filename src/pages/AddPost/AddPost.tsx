import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './AddPost.module.scss';
import { useAppSelector } from '../../hoc/hook';
import { selectIsAuth } from '../../store/slices/authSlice';
import { Button, Paper, TextField } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import { uploadFile } from '../../firebase/firebaseApi';
import { deleteFile } from '../../firebase/firebaseApi';
import { getImage } from '../../firebase/firebaseApi';
import { resolve } from 'path';

export const AddPost = () => {
    const { id } = useParams(); // post id
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuth)

    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [selectedImage, setSelectedImage] = React.useState<File>(null);
    const [text, setText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    const inputFileRef = React.useRef(null);

    const isEditing = Boolean(id);

    React.useEffect(() => {
        if (id) {
            axiosInstance.get(`/posts/${id}`)
                .then(({ data }) => {
                    setText(data.data.text);
                    setTitle(data.data.title);
                    setImageUrl(data.data.image);
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
            await uploadFile(selectedImage);
            const url = await getImage(selectedImage.name)
            setImageUrl(url);

            const fields = {
                text,
                title,
                image: url,
            };

            const { data } = isEditing
                ? await axiosInstance.put(`/posts/${id}`, fields)
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
            <input ref={inputFileRef} type='file' onChange={handleChangeFile} />
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