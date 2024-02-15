import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "@/store/usersSlice";

export const store = configureStore({
    reducer: {
        user: usersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch