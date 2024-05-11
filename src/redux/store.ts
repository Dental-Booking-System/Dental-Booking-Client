import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice.ts";
import patientReducer from "./patientSlice.ts";


export const store = configureStore({
    reducer: {
        appointment: appointmentReducer,
        patient: patientReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;