import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EventoPage from '../ui/page/admin/EventoPage/EventoPage';
import HomePage from '../ui/page/admin/HomePage/HomePage';
import RouteLayout from './RouteLayout';

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteLayout />}>
                    <Route path='/main/*'>
                        <Route path="admin">
                            <Route index element={<HomePage />} />
                            <Route path={'evento/create'} element={<EventoPage />} />
                        </Route>
                        <Route path="user">
                            <Route index element={<HomePage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/main/admin" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute