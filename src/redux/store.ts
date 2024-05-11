import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice.ts";
import patientReducer from "./patientSlice.ts";
import authReducer from "./authSlice.ts";


export const store = configureStore({
    reducer: {
        appointment: appointmentReducer,
        patient: patientReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;