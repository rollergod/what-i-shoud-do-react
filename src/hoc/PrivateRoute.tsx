import React from 'react';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const token: string = localStorage.getItem('jwt');

    if (!token)
        return <Navigate to='/login' replace />

    return children;
};

export { PrivateRoute };