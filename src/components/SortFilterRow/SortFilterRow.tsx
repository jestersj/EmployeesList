import React from 'react';
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {
    resetState,
    selectFilterIsArchive,
    selectFilterRole,
    selectSort,
    sortAndFilterBy
} from "@/store/usersSlice";
import {IRole, ISort} from "@/types/types";
import RolesDropdown from "@/components/RolesDropdown/RolesDropdown";
import CrossIcon from "@/assets/x-lg.svg";
import s from "./SortFilterRow.module.scss";

const SortFilterRow = () => {
    const {sortedBy, filteredBy} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const handleSort = (type: ISort | null) => {
        dispatch(selectSort(type))
        dispatch(sortAndFilterBy())
    }
    const handleIsArchive = () => {
        dispatch(selectFilterIsArchive(true))
        dispatch(sortAndFilterBy())
    }
    const handleRole = (type: IRole) => {
        dispatch(selectFilterRole(type))
        dispatch(sortAndFilterBy())
    }
    const handleReset = () => {
        dispatch(resetState())
    }
    return (
        <div className={s.cont}>
            <div className={s.col}>
                <span>Сортировка по:</span>
                <Checkbox
                    label={'Имени'}
                    checked={sortedBy === 'name'}
                    onChange={() => handleSort('name')}
                />
                <Checkbox
                    label={'Дате рождения'}
                    checked={sortedBy === 'birthday'}
                    onChange={() => handleSort('birthday')}
                />
                {(sortedBy || filteredBy) &&
                    <button
                        onClick={handleReset}
                        className={s.reset_btn}
                    >
                        <CrossIcon fill={'red'} width={25} height={25}/>
                        Сбросить фильтры
                    </button>
                }
            </div>
            <div className={s.col}>
                <span>Фильтр по:</span>
                <Checkbox
                    label={'В архиве'}
                    checked={filteredBy.isArchive}
                    onChange={handleIsArchive}
                />
                <div className={s.dropdown_block}>
                    Роль:
                    <RolesDropdown roles={["cook", "driver", "waiter"]}
                                   selectFunction={handleRole}
                                   currentItem={filteredBy ? filteredBy.role ? filteredBy.role: null : null}
                    />
                </div>
            </div>
        </div>
    );
};

export default SortFilterRow;