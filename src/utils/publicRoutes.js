import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/userContext.js';

const PublicRoutes = () => {
    const { user } = useContext(UserContext);
    return (
        !user ? <Outlet /> : <Navigate to={"/app"} />
    )
}

export default PublicRoutes;
