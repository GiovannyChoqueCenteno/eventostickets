import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    isAuthenticated: boolean;
    type: string;
}

const RouteCliente = (props: Props) => {
    const { isAuthenticated, type } = props;
    if (isAuthenticated && type === "cliente") {
        return <Outlet />;
    }
    return <Navigate to={'/auth/login'} replace />
}

export default RouteCliente