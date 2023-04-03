import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useParams } from 'react-router-dom';

import styles from './AddPost.module.scss';
import { useAppSelector } from '../../hoc/hook';
import { selectIsAuth } from '../../store/slices/authSlice';
import { Button, Paper, TextField } from '@mui/material';

export const AddPost = () => {
    const { id } = useParams(); // post id
    const isAuth = useAppSelector(selectIsAuth)

    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [text, setText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    const inputFileRef = React.useRef(null);

    const isEditing = Boolean(id);

    const handleChangeFile = () => {

    }

    const onClickRemoveImage = () => {

    }

    const onSubmit = () => {

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

    const autofocusNoSpellcheckerOptions = React.useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
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