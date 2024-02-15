import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "@/store";
import UserItem from "@/components/UserItem/UserItem";
import s from "./UserList.module.scss";

const UserList = () => {
    const {sortedAndFilteredUsers} = useSelector((state: RootState) => state.user)
    return (
        <div className={s.container}>
            {
                sortedAndFilteredUsers.map(el =>
                    <UserItem user={el} key={el.id}/>
                )
            }
        </div>
    );
};

export default UserList;