import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppointmentState {
    date: Date,
    service: string,
    name: string,
    phone: string,
    gender: string,
    additionalInfo: string
}

const initialState: AppointmentState = {
    date: new Date(),
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
        onChangeDate: (state, action: PayloadAction<Date>) => {
            state.date = action.payload;
        }
    }
})

export default appointmentSlice.reducer;