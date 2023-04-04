import { IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostSkeleton } from './Skeleton';
import clsx from 'clsx';

import styles from './Post.module.scss';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { UserInfo } from '../UserInfo/UserInfo';

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
    children
}) => {
    const dispatch = useDispatch();

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
                    <IconButton onClick={() => { }} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {image && (
                <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} alt={title} src={image} />
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
                    </ul>
                </div>
            </div>
        </div>
    )
}