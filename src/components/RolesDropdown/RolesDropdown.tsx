import React, {FC, useEffect, useRef, useState} from 'react';
import {IRole} from "@/types/types";
import s from "./RolesDropdown.module.scss";

interface Props {
    roles: IRole[]
    selectFunction: (type: IRole) => void
    currentItem: IRole | null
}
const RolesDropdown: FC<Props> = ({roles, selectFunction, currentItem}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const handleClick = (type: IRole) => {
        selectFunction(type)
        toggle()
    }

    const dropdownRef = useRef<HTMLDivElement>()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])
    return (
        <div className={s.dropdown} ref={dropdownRef}>
            <button className={s.toggle_btn} onClick={toggle} type={'button'}>
                {currentItem ? currentItem : 'Выберите роль'}
            </button>
            {
                isOpen &&
                <div className={s.items_list}>
                    {
                        roles.map(el =>
                            <div>
                                <button className={s.item_btn}
                                        onClick={() => handleClick(el)}
                                >{el}</button>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default RolesDropdown;