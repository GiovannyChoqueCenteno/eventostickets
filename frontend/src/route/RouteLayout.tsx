import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../ui/layout/sidebar/Sidebar'

const RouteLayout = () => {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>
    )
}

export default RouteLayout