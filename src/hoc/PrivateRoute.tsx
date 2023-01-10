import React from 'react';

import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../store/slices/authSlice';


const PrivateRoute = ({ ...children }) => {

    sessionStorage.setItem('jwt', 'test');

    const token = useSelector(selectCurrentToken);

    if (token === null || '')
        return <Navigate to='/login' />

    return <Route {...children} />
};

export default PrivateRoute;