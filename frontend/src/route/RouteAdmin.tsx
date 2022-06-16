import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    isAuthenticated: boolean;
    type: string;
}

const RouteAdmin = (props: Props) => {
    const { isAuthenticated, type } = props;
    if (isAuthenticated && type === "admin") {
        return <Outlet />;
    }
    return <Navigate to={'/'} replace />
}

export default RouteAdmin