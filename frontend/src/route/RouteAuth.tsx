import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/store/config';

interface Props {
    isAuthenticated: boolean;
    type: string;
}

const RouteAuth = (props: Props) => {

    const cart = useAppSelector((s) => s.cart);
    const { isAuthenticated, type } = props;

    if (isAuthenticated) {
        if (type === "admin")
            return <Navigate to={'/main/admin'} />
        console.log(cart.espacio);
        if (cart.espacio.length === 0)
            return <Navigate to={'/'} replace={true} />
        return <Navigate to={'/pay'} replace={true} />
    }

    return <Outlet />;
}

export default RouteAuth