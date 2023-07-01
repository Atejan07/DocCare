import { TypePatient } from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentAllPatientsState;
};

type CurrentAllPatientsState = TypePatient[]
const initialState = {
  value: [] as CurrentAllPatientsState,
} as InitialState;

export const currentAllPatients = createSlice({
  name: 'currentAllPatient',
  initialState,
  reducers: {
    setAllPatient: (state, action: PayloadAction<TypePatient[]>) => {
      const patients = action.payload;
      return {
        value: patients
      };
    },
  },
});

export const { setAllPatient } = currentAllPatients.actions;
export default currentAllPatients.reducer;
