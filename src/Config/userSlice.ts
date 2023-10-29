import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

export interface UserState {
    displayName: string,
    email: string,
    photoURL: string,
    createdAt: string,
    id: string,
    lastLogin: string,
}

const initialState = {
    user: null as UserState | null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        updateUserProfile: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        }
    }
});

export const {
    loginUser,
    logout,
    updateUserProfile
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer