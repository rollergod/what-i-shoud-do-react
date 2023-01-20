import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentImageRef, deleteCredentials } from '../store/slices/authSlice';
import { getImage } from '../firebase/firebaseApi';

const Home = () => {

    const dispatch = useDispatch();
    // const imageRef = useSelector(selectCurrentImageRef);
    const imageRef: string = localStorage.getItem('imageRef');
    const userName: string = localStorage.getItem('userName');

    const handleLogOut = (): void => {
        dispatch(deleteCredentials({}));
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    }

    return (
        <div style={{ height: 500 }} className='d-flex flex-column justify-content-center align-items-center'>
            <div className=''>
                <span className='fs-3 px-5'>Hello, {userName}</span>
                <img style={{ width: 100, height: 100 }} className='rounded-pill' src={imageRef} />
            </div>
            <span onClick={handleLogOut} className='pt-5 fs-5 exit-link'>Logout</span>
        </div>
    );
};


export default Home; 