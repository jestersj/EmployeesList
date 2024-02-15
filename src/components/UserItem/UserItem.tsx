import React, {FC} from 'react';
import {IUser} from "@/types/types";
import {Link} from "react-router-dom";
import s from "./UserItem.module.scss";
import Checkbox from "@/components/shared/Checkbox/Checkbox";

interface Props {
    user: IUser
}
const UserItem: FC<Props> = ({user}) => {
    return (
        <Link to={`/${user.id}`} className={s.card}>
            <b>{user.name}</b>
            <div>{user.role}</div>
            <div>{user.phone}</div>
            <div className={s.checkbox_cont}>
                <Checkbox label={'В архиве'} checked={user.isArchive}/>
            </div>
        </Link>
    );
};

export default UserItem;