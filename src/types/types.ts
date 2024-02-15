export interface IUser {
    id: number
    name: string
    isArchive: boolean
    role: string
    phone: string
    birthday: string
}

export type ISort = 'name' | 'birthday'

export type IRole = 'driver' | 'waiter' | 'cook'

export type IFilter = 'isArchive' | IRole

