import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppointmentState {
    date: string,
    service: string,
    name: string,
    phone: string,
    gender: string,
    additionalInfo: string
}

const initialState: AppointmentState = {
    date: "",
    service: "",
    name: "",
    phone: "",
    gender: "",
    additionalInfo: ""
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        onChangeDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        }
    }
})

export const {onChangeDate} = appointmentSlice.actions;
export default appointmentSlice.reducer;