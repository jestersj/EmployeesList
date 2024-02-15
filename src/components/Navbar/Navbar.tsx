import React from 'react';
import s from "./Navbar.module.scss"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={s.nav} id="sidebar">
            <NavLink to={'/'} className={s.link}>Главная</NavLink>
            <NavLink to={'/add-user'} className={s.link}>Добавить пользователя</NavLink>
        </nav>
    );
};

export default Navbar;