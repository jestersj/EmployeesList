import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import UserPage from "@/pages/UserPage";
import AddUserPage from "@/pages/AddUserPage";
import ErrorPage from "@/pages/ErrorPage";

const routes = [
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/:id',
        element: <UserPage/>
    },
    {
        path: '/add-user',
        element: <AddUserPage/>
    },
    {
        path: '/error',
        element: <ErrorPage/>
    },
    {
        path: '/*',
        element: <Navigate to={'/error'}/>
    },
]

const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map(el =>
                    <Route path={el.path} element={el.element} key={el.path}/>
                )
            }
        </Routes>
    );
};

export default AppRouter;