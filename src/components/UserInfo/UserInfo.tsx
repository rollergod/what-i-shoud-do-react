import React from 'react';
import styles from './UserInfo.module.scss';
import { getImage } from '../../firebase/firebaseApi';

export const UserInfo = ({ imageName, userName, additionalText }) => {

    console.log(imageName);
    const [url, setUrl] = React.useState('');

    const getUrlImage = async () => {
        getImage(imageName)
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
    }, [])

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={url || '/noavatar.png'} alt={userName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{userName}</span>
                {/* AdditionalText - CreatedDate */}
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
};
