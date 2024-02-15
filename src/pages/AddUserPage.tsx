import React from 'react';
import {Link} from "react-router-dom";
import Arrow from "@/assets/arrow-return-left.svg";
import UserEditForm from "@/components/UserEditForm/UserEditForm";
import s from "@/pages/AddUserPage.module.scss";

const AddUserPage = () => {
    return (
        <main className={'container'}>
            <Link to={'/'} className={s.link}>
                <Arrow fill={'gray'} width={30} height={30}/>
                Назад
            </Link>
            <UserEditForm user={null}/>
        </main>
    );
};

export default AddUserPage;