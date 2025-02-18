import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AdminState = {
    recentActiveUsers: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateRecentActiveUsers: (state, action: PayloadAction<number>) => {
            state.recentActiveUsers = [...state.recentActiveUsers, action.payload];
        },
    },
    extraReducers: (builder) => {

    },
    selectors: {
        getRecentActiveUsers: (state) => state.recentActiveUsers,
    },
});

export const { updateRecentActiveUsers } = adminSlice.actions;
export const { getRecentActiveUsers } = adminSlice.selectors;
export default adminSlice;
