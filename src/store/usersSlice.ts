import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialUserList from "@/employees.json";
import {IUser, ISort, IFilter, IRole} from "@/types/types";
import {sortCallback} from "@/helpers/sortCallback";
import {filterCallback} from "@/helpers/filterCallback";

interface IState {
    users: IUser[]
    sortedAndFilteredUsers: IUser[]
    sortedBy: null | ISort,
    filteredBy: IFilter
}
const initialState: IState = {
    users: initialUserList,
    //Для того чтобы мы могли сортировать и фильтровать одновременно,
    //а также сбрасывать фильтрацию или сортировку, не сбрасывая что-то другое из этого
    //необходимо хранить изначальный массив пользователей, а показывать уже модифицированный
    sortedAndFilteredUsers: initialUserList,
    sortedBy: null,
    filteredBy: {
        isArchive: false,
        role: null
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        editUser(state, action: PayloadAction<IUser>) {
            const {id} = action.payload;
            const userIndex = state.users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.users[userIndex] = action.payload;
                state.sortedAndFilteredUsers = state.users
            }
        },

        addUser(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload)
            state.sortedAndFilteredUsers = state.users
        },

        selectFilterRole(state, action: PayloadAction<IRole | null>) {
            state.filteredBy.role = action.payload
        },

        selectFilterIsArchive(state, action: PayloadAction<boolean>) {
            state.filteredBy.isArchive = action.payload
        },

        selectSort(state, action: PayloadAction<ISort | null>) {
            state.sortedBy = action.payload
        },

        sortAndFilterBy(state) {
            let arr: IUser[] = [...state.users]
            //Сначала фильтруем массив, чтобы осталось сортировать меньше пользователей
            //т.к. фильтрация занимает всего O(n), сортировка в среднем больше
            if (state.filteredBy) {
                arr = arr.filter(el => filterCallback(el, state.filteredBy))
            }
            if (state.sortedBy) {
                arr = arr
                    .sort((a, b) => sortCallback(state.sortedBy, a, b))
            }
            state.sortedAndFilteredUsers = arr
        },

        resetState(state) {
            state.sortedBy = null
            state.filteredBy = {
                isArchive: false,
                role: null
            }
            state.sortedAndFilteredUsers = state.users
        }
    }
})

export const {
    editUser,
    addUser,
    selectFilterRole,
    selectFilterIsArchive,
    selectSort,
    sortAndFilterBy,
    resetState
} = usersSlice.actions
export default usersSlice.reducer