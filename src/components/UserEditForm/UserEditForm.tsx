import React, {FC, MouseEvent, useState} from 'react';
import {IRole, IUser} from "@/types/types";
import {useDispatch, useSelector} from "react-redux";
import {addUser, editUser, sortAndFilterBy} from "@/store/usersSlice"
import {useNavigate} from "react-router-dom";
import s from "./UserEditForm.module.scss";
import type {RootState} from "@/store";
import InputMask from "react-input-mask";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import RolesDropdown from "@/components/RolesDropdown/RolesDropdown";

interface Props {
    user: IUser | null
}
const UserEditForm: FC<Props> = ({user}) => {
    const [name, setName] = useState(user?.name ?? '')
    const [role, setRole] = useState<IRole | null>(user?.role as IRole ?? null)
    const [phone, setPhone] = useState(user?.phone ?? '')
    const [birthday, setBirthday] = useState(user?.birthday ?? '')
    const [isArchive, setIsArchive] = useState(user?.isArchive ?? false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users} = useSelector((state: RootState) => state.user)

    const submitData = () => {
        const newData: IUser = {
            id: user ? user.id : users[users.length - 1].id + 1,
            name,
            phone,
            role,
            birthday,
            isArchive
        }
        user ? dispatch(editUser(newData)) : dispatch(addUser(newData))
        dispatch(sortAndFilterBy())
        navigate('/')
    }
    const validate = () => {

    }
    return (
        <form onSubmit={submitData} className={s.form}>
            <label className={s.label}>
                ФИО
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label className={s.label}>
                Роль
                <RolesDropdown roles={['cook', 'waiter', 'driver']} selectFunction={setRole} currentItem={role}/>
            </label>
            <label className={s.label}>
                Телефон
                <InputMask mask={'+7 (999) 999-9999'} value={phone}
                           onChange={(e) => setPhone(e.target.value)}/>
            </label>
            <label className={s.label}>
                Дата рождения
                <InputMask mask={'99.99.9999'} value={birthday}
                           onChange={(e) => setBirthday(e.target.value)}/>
            </label>
            <div className={s.checkbox_cont}>
                <Checkbox label={'В архиве'} checked={isArchive} onChange={() => setIsArchive(!isArchive)}/>
            </div>
            <div className={s.btn_cont}>
                <button type={'submit'} onClick={(e) => {
                    e.preventDefault()
                    submitData()
                }}>Сохранить
                </button>
            </div>
        </form>
    );
};

export default UserEditForm;