import React from 'react';
import {Link} from "react-router-dom";
import s from "./ErrorPage.module.scss";

const ErrorPage = () => {
    return (
        <div className={s.cont}>
            <h1>Упс... Кажется, такой страницы не существует</h1>
            <Link to={'/'}>На главную</Link>
        </div>
    );
};

export default ErrorPage;