import { IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PostSkeleton } from './Skeleton';
import clsx from 'clsx';

import styles from './Post.module.scss';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { UserInfo } from '../UserInfo/UserInfo';
import { getImage } from '../../firebase/firebaseApi';
import { useAppDispatch } from '../../hoc/hook';
import { removePost } from '../../store/slices/postSlice';
import axiosInstance from '../../api/axiosInstance';
import { API_URLS } from '../../api/api_constants';

export const Post = ({
    id,
    title,
    text,
    image,
    viewsCount,
    isFullPost,
    isLoading,
    isEditable,
    userModel,
    createdDate,
    children
}) => {
    // TODO: попробовать сделать скелетон при загрузке всех постов(ибо плохо прогружается аватарка профиля и картинка поста)
    const dispatch = useAppDispatch();
    const [url, setUrl] = React.useState('');

    const getUrlImage = async () => {
        console.log(image);
        getImage(image)
            .then(res => {
                console.log(res);
                setUrl(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getUrlImage();
    }, [isLoading]);

    const removePostHandler = async () => {
        if (window.confirm('Вы действительно хотите удалить статью?')) {
            dispatch(removePost({ id }));
            await axiosInstance.delete(`${API_URLS.GET_POSTS}/${id}`);
        }
    }

    if (isLoading) {
        return <PostSkeleton />
    }

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton color='primary'>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={removePostHandler} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {image && (
                <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} alt={title} src={url} />
            )}
            <div className={styles.wrapper}>
                <UserInfo {...userModel} />
                <div className={styles.idention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                    </h2>
                    {children && <div className={styles.content}>{children}</div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <span>{createdDate}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}