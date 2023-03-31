import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCredentials, selectCurrentImageRef, selectCurrentUser } from '../store/slices/authSlice';
import { API_URLS } from '../api/api_constants';
import axiosInstance from '../api/axiosInstance';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageRef = useSelector(selectCurrentImageRef);
    const userModel = useSelector(selectCurrentUser);

    const handleLogOut = (): void => {
        navigate('/login', { replace: true });
        dispatch(deleteCredentials({}));
    }

    const testPrivateMethod = async (): Promise<void> => {
        try {
            const res = await axiosInstance.get(API_URLS.PRIVATE_METHOD);
            console.log('PRIVATE METHOD', res);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div style={{ height: 500 }} className='d-flex flex-column justify-content-center align-items-center'>
            <div className=''>
                <span className='fs-3 px-5'>Hello, {userModel.name}</span>
                <img style={{ width: 100, height: 100 }} className='rounded-pill' src={imageRef} />
            </div>
            <span onClick={handleLogOut} className='pt-5 fs-5 exit-link'>Logout</span>
            <span onClick={testPrivateMethod} className='pt-5 fs-5 exit-link'>Test method</span>
        </div>
    );
};


export default Home; 