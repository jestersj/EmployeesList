import React from 'react';
import s from "./SortFilterRow.module.scss";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {resetState, selectFilter, selectSort, sortAndFilterBy} from "@/store/usersSlice";
import {IFilter, ISort} from "@/types/types";
import RolesDropdown from "@/components/RolesDropdown/RolesDropdown";

const SortFilterRow = () => {
    const {sortedBy, filteredBy} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const handleSort = (type: ISort | null) => {
        dispatch(selectSort(type))
        dispatch(sortAndFilterBy())
    }
    const handleFilter = (type: IFilter | null) => {
        dispatch(selectFilter(type))
        dispatch(sortAndFilterBy())
    }
    const handleReset = () => {
        dispatch(resetState())
    }
    return (
        <div className={s.cont}>
            <div className={s.col}>
                <span>Сортировка по:</span>
                <Checkbox label={'Имени'} checked={sortedBy === 'name'}
                          onChange={() => handleSort('name')}
                />
                <Checkbox label={'Дате рождения'} checked={sortedBy === 'birthday'}
                          onChange={() => handleSort('birthday')}
                />
                {(sortedBy || filteredBy) && <button onClick={handleReset}>Сбросить фильтры</button>}
            </div>
            <div className={s.col}>
                <span>Фильтр по:</span>
                <Checkbox label={'В архиве'} checked={filteredBy === 'isArchive'}
                          onChange={() => handleFilter('isArchive')}
                />
                <div className={s.dropdown_block}>
                    Роль:
                    <RolesDropdown roles={["cook", "driver", "waiter"]}
                                   selectFunction={handleFilter}
                                   currentItem={filteredBy !== 'isArchive' ? filteredBy : null}/>
                </div>
            </div>
        </div>
    );
};

export default SortFilterRow;