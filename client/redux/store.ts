import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import currentPatientReducer from './features/patient-slice';
import currentDoctorReducer from './features/doctor-slice';
import chatPatientReducer from './features/chat-patient-slice';
import currentJuniorReducer from './features/junior-slice';
import toggleDisplayChat from './features/display-chat';
import displayChat from './features/display-chat';
import setAllPatientReducer from './features/all-patients-slice';
import patientToViewReducer from './features/all-patients-slice';
import AvailableSpecialist from './features/available-doctors-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    authReducer,
    currentPatientReducer,
    currentDoctorReducer,
    chatPatientReducer,
    AvailableSpecialist,
    currentJuniorReducer,
    toggleDisplayChat,  
    displayChat,
    setAllPatientReducer,
    patientToViewReducer
  },
});
// type of store:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;