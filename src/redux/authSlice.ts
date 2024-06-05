import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

interface authState {
    isLoggedIn: boolean,
}

const initialState: authState = {
    isLoggedIn: false,
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
        },
    }
})

export const {
    logOut,
    logIn,
} = authSlice.actions;
export default authSlice.reducer;