import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialUserList from "@/employees.json";
import {IUser, ISort, IFilter} from "@/types/types";

interface IState {
    users: IUser[]
    sortedAndFilteredUsers: IUser[]
    sortedBy: null | ISort,
    filteredBy: null | IFilter
}
const initialState: IState = {
    users: initialUserList,
    //Для того чтобы мы могли сортировать и фильтровать одновременно,
    //а также сбрасывать фильтрацию или сортировку, не сбрасывая что-то другое из этого
    //необходимо хранить изначальный массив пользователей, а показывать уже модифицированный
    sortedAndFilteredUsers: initialUserList,
    sortedBy: null,
    filteredBy: null
}

const parseDate = (str: string) => {
    const [day, month,year] = str.split('.').reverse().map(el => Number(el))
    return new Date(day, month, year).getTime()
}
const sortCallback = (sortParam: ISort, a: IUser, b: IUser) => {
    let aVal: number | string = a[sortParam]
    let bVal: number | string = b[sortParam]
    if (sortParam === 'birthday') {
        aVal = parseDate(aVal)
        bVal = parseDate(bVal)
        return aVal - bVal
    }
    if (aVal > bVal) {
        return 1
    }
    if (aVal < bVal) {
        return -1
    }
    return 0
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
        selectFilter(state, action: PayloadAction<IFilter | null>) {
            state.filteredBy = action.payload
        },
        selectSort(state, action: PayloadAction<ISort | null>) {
            state.sortedBy = action.payload
        },
        sortAndFilterBy(state) {
            let arr: IUser[] = state.users
            //Сначала фильтруем массив, чтобы осталось сортировать меньше пользователей
            //т.к. фильтрация занимает всего O(n), сортировка в среднем больше
            if (state.filteredBy) {
                arr = arr.filter(el => {
                    if (state.filteredBy === 'isArchive') {
                        return el.isArchive === true
                    } else {
                        return el.role === state.filteredBy
                    }
                })
            }
            if (state.sortedBy) {
                arr = arr
                    .sort((a, b) => sortCallback(state.sortedBy, a, b))
            }
            state.sortedAndFilteredUsers = arr
        },
        resetState(state) {
            state.sortedBy = null
            state.filteredBy = null
            state.sortedAndFilteredUsers = state.users
        }
    }
})

export const {
    editUser,
    addUser,
    selectFilter,
    selectSort,
    sortAndFilterBy,
    resetState
} = usersSlice.actions
export default usersSlice.reducer