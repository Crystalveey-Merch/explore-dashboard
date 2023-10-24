import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserState } from './userSlice';



const initialState = {
    users: [] as UserState[],
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users = action.payload
        },
        updateUsersProfile: (state, action: PayloadAction<UserState>) => {
            const { id } = action.payload;
            const index = state.users.findIndex((user) => user.id === id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    }
});

export const {
    addUsers,
    updateUsersProfile
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer