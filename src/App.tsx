import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import UserPage from "@/pages/UserPage";
import Navbar from "@/components/Navbar/Navbar";
import AddUserPage from "@/pages/AddUserPage";

const App = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>} />
                <Route path={'/:id'} element={<UserPage/>} />
                <Route path={'/add-user'} element={<AddUserPage/>} />
            </Routes>
        </>
    );
};

export default App;