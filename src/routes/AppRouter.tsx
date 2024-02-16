import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import UserPage from "@/pages/UserPage";
import AddUserPage from "@/pages/AddUserPage";

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