import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { actionUsuario } from '../redux/slice/usuarioSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/config';
import AddEncargadoPage from '../ui/page/admin/AddEncargadoPage/AddEncargadoPage';
import EditEventoPage from '../ui/page/admin/EditEventoPage/EditEventoPage';
import EventoPage from '../ui/page/admin/EventoPage/EventoPage';
import HomePageAdmin from '../ui/page/admin/HomePage/HomePage';
import LugarPage from '../ui/page/admin/LugarPage/LugarPage';
import RegistroPage from '../ui/page/admin/RegistroPage/RegistroPage';
import LoginPage from '../ui/page/auth/LoginPage';
import RegisterUserPage from '../ui/page/auth/RegisterUserPage';
import BuyTicketPage from '../ui/page/user/BuyTicket/BuyTicketPage';
import DetailEventPage from '../ui/page/user/DetailEvent/DetailEventPage';
import DetalleBuyPage from '../ui/page/user/DetelleBuy/DetalleBuyPage';
import EntradaPage from '../ui/page/user/Entrada/EntradaPage';
import HomePageUser from '../ui/page/user/HomePage/HomePage';
import MyBuyPage from '../ui/page/user/MyBuy/MyBuyPage';
import PayTicketPage from '../ui/page/user/PayTicket/PayTicketPage';
import RouteAdmin from './RouteAdmin';
import RouteAuth from './RouteAuth';
import RouteCliente from './RouteCliente';
import RouteLayout from './RouteLayout';

const AppRoute = () => {

    const { isAuthenticated, type } = useAppSelector((s) => s.usuario);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let token = localStorage.getItem("_token");
        if (token) dispatch(actionUsuario.addUsuario({ token }));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteLayout />}>

                    {/* Rutas del Admin */}
                    <Route path='/main/*'>
                        <Route path="admin">
                            <Route element={<RouteAdmin isAuthenticated={isAuthenticated} type={type} />}>
                                <Route index element={<HomePageAdmin />} />
                                <Route path={'evento/create'} element={<EventoPage />} />
                                <Route path={'evento/edit'} element={<EditEventoPage />} />
                                <Route path={'encargado/add/:idEvento'} element={<AddEncargadoPage />} />
                                <Route path={'lugar/:idEvento'} element={<LugarPage />} />
                                <Route path={'lugar/registro/:idLugar'} element={<RegistroPage />} />
                            </Route>
                        </Route>
                    </Route>

                    {/* Rutas Publicas */}
                    <Route path={'/'} element={<HomePageUser />} />
                    <Route path={'/detail'} element={<DetailEventPage />} />
                    <Route path={'/buy'} element={<BuyTicketPage />} />

                    {/* Rutas Cliente */}
                    <Route element={<RouteCliente isAuthenticated={isAuthenticated} type={type} />}>
                        <Route path={'/factura'} element={<MyBuyPage />} />
                        <Route path={'/detalle/:facturaId'} element={<DetalleBuyPage />} />
                        <Route path={'/pay'} element={<PayTicketPage />} />
                        {/* <Route path={'/entrada/pdf'} element={<EntradaPage />} /> */}
                    </Route>

                </Route>

                {/* Rutas de Authenticacion */}
                <Route path='/auth/*'>
                    <Route element={<RouteAuth isAuthenticated={isAuthenticated} type={type} />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="user">
                            <Route path="register" element={<RegisterUserPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Si no existe la ruta */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute