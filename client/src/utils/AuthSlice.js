import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        token: null,
        userData: []
    },
    reducers: {
        addToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload
        },
        LogoutUser: () => {
            state.token = null
            localStorage.removeItem('token')
        },
        getUser: (state, action) => {
            state.userData = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToken, LogoutUser, getUser } = counterSlice.actions

export default counterSlice.reducer