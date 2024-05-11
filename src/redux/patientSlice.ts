import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        
    }
})

export const {
    onChangeName,
    onChangePhone,
    onChangeBirthDate,
    onChangeGender
} = patientSlice.actions;
export default patientSlice.reducer;