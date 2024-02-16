import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Link, Navigate, useParams} from "react-router-dom";
import UserEditForm from "@/components/UserEditForm/UserEditForm";
import Arrow from "@/assets/arrow-return-left.svg";
import s from "./UserPage.module.scss";

const UserPage = () => {
    const {id} = useParams()
    const user = useSelector((state: RootState) => {
        return state.user.users.find(el => el.id === Number(id))
    })
    if (!user) {
        return <Navigate to={'/error'}/>
    }
    return (
        <main className={'container'}>
            <Link to={'/'} className={s.link}>
                <Arrow fill={'gray'} width={30} height={30}/>
                Назад
            </Link>
            <UserEditForm user={user}/>
        </main>
    );
};

export default UserPage;