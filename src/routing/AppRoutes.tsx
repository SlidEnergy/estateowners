import {Home} from "../pages/Home";
import AdminLogin from "../pages/admin/AdminLogin";
import Login from "../pages/Login";
import UsersPage from "../pages/admin/UsersPage";
import UserPage from "../pages/admin/UserPage";

import React from 'react';
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {useAuth} from "../hooks/useAuth";
import ProfilePage from "../pages/ProfilePage";
import EstatesPage from "../pages/admin/EstatesPage";
import EstatePage from "../pages/admin/EstatePage";

const AppRoutes = () => {
    const {isAuth} = useAuth();

    return (
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='/admin' >
                <Route element={<ProtectedRoute isAllowed={!isAuth} redirectPath='/admin/users'></ProtectedRoute>}>
                    <Route index element={<AdminLogin />}></Route>
                    <Route path='/admin/login' element={<AdminLogin />}></Route>
                </Route>
                <Route element={<ProtectedRoute isAllowed={isAuth} redirectPath='/admin/login' />}>
                    <Route path='/admin/users'>
                        <Route index element={<UsersPage />}></Route>
                        <Route path=':id' element={<UserPage />}></Route>
                    </Route>
                    <Route path='/admin/estates'>
                        <Route index element={<EstatesPage />}></Route>
                        <Route path=':id' element={<EstatePage />}></Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;