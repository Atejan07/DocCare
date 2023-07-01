import { TypePatient, TypeAppointment } from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentPatientToView;
};

type CurrentPatientToView = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
  bloodType: string;
  medications: string;
  surgicalHistory: string;
  familyMedicalHistory: string;
  profilePicture?: string;
  patientAppointments: TypeAppointment[] | undefined;
};
const initialState = {
  value: {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    allergies: '',
    bloodType: '',
    medications: '',
    surgicalHistory: '',
    familyMedicalHistory: '',
    profilePicture: '',
    patientAppointments: [],
  } as CurrentPatientToView,
} as InitialState;

export const patientToView = createSlice({
  name: 'patientToView',
  initialState,
  reducers: {
    setPatientToView: (state, action: PayloadAction<TypePatient>) => {
      const {
        id,
        name,
        email,
        password,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        allergies,
        bloodType,
        medications,
        surgicalHistory,
        familyMedicalHistory,
        profilePicture,
        patientAppointments,
      } = action.payload;
      return {
        value: {
          id,
          name,
          email,
          password,
          phoneNumber,
          address,
          dateOfBirth,
          gender,
          allergies,
          bloodType,
          medications,
          surgicalHistory,
          familyMedicalHistory,
          profilePicture,
          patientAppointments,
        },
      };
    },
  },
});

export const { setPatientToView } = patientToView.actions;
export default patientToView.reducer;
