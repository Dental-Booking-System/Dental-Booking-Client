import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";

interface patientState {
    name: string,
    phone: string,
    birthDate: string,
    gender: string,
}

const initialState: patientState = {
    name: "",
    phone: "",
    birthDate: "",
    gender: "",
}

const patientSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        onChangeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        onChangePhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        onChangeBirthDate: (state, action: PayloadAction<string>) => {
            state.birthDate = action.payload;
        },
        onChangeGender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload;
        },
        reset: (state) => {
            Object.assign(state, initialState);
        }
    }
})

export const {
    onChangeName,
    onChangePhone,
    onChangeBirthDate,
    onChangeGender,
    reset
} = patientSlice.actions;
export default patientSlice.reducer;