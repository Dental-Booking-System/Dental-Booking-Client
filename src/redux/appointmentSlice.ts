import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppointmentState {
    date: string,
    time: string,
    service: string,
    name: string,
    phone: string,
    gender: string,
    additionalInfo: string
}

const initialState: AppointmentState = {
    date: "",
    time: "",
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
        },
        onChangeTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        onChangeService: (state, action: PayloadAction<string>) => {
            state.service = action.payload;
        },
        onChangeAdditionalInfo: (state, action: PayloadAction<string>) => {
            state.additionalInfo = action.payload;
        },

    }
})

export const {
    onChangeDate,
    onChangeTime,
    onChangeService,
    onChangeAdditionalInfo
} = appointmentSlice.actions;
export default appointmentSlice.reducer;