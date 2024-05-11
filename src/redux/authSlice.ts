import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface authState {
    isLoggedIn: boolean
}

const initialState: authState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true
        },
        logOut: (state) => {
            state.isLoggedIn = false
        }
    }
})

export const {
    logOut,
    logIn
} = authSlice.actions;
export default authSlice.reducer;