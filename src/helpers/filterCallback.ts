import {IFilter, IUser} from "@/types/types";

export const filterCallback = (item: IUser, state: IFilter) => {
    let res = true
    if (state.isArchive) {
        res = res && item.isArchive === true
    }
    if (state.role) {
        res = res && item.role === state.role
    }
    return res
}