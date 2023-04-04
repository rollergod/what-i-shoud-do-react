import React from 'react';
import styles from './UserInfo.module.scss';
import { getImage } from '../../firebase/firebaseApi';

export const UserInfo = ({ imageName, displayName, additionalText }) => {

    const [url, setUrl] = React.useState('');

    const getUrlImage = async () => {
        getImage(imageName)
            .then(res => {
                setUrl(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getUrlImage();
    }, [])

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={url || '/noavatar.png'} alt={displayName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{displayName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
};
