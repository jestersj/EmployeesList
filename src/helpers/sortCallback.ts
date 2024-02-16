import {ISort, IUser} from "@/types/types";
import {parseDate} from "@/helpers/parseData";

export const sortCallback = (sortParam: ISort, a: IUser, b: IUser) => {
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