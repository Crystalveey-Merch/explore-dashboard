import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';



const initialState = {
    hidden: true,
}

const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.hidden = !state.hidden
        },
    }
});

export const {
    toggleMenu,
} = toggleSlice.actions;

export const selectToggle = (state: RootState) => state.toggle.hidden;
export default toggleSlice.reducer