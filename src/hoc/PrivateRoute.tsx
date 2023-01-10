import React from 'react';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../store/slices/authSlice';


const PrivateRoute = ({ children }) => {

    const token = useSelector(selectCurrentToken);

    if (!token)
        return <Navigate to='/login' replace />

    return children;
};

export { PrivateRoute };