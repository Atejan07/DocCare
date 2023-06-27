import express from 'express';
import { Router } from 'express';
import {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  createAppointment,
  loginPatient,
} from '../controllers/patient.controller';
import {
  patientAuthMiddleware,
  anyDoctorAuthMiddleware,
} from '../middleware/authorization';

const patientRouter = Router();

patientRouter.post('/patient/register', createPatient);
patientRouter.post('/patient/login', loginPatient);
patientRouter.get('/patient/:id', patientAuthMiddleware, getPatient);
patientRouter.get('/patients', anyDoctorAuthMiddleware, getPatients);
patientRouter.put('/patient/:id', patientAuthMiddleware, updatePatient);
patientRouter.delete('/patient/:id', patientAuthMiddleware, deletePatient);
patientRouter.get(
  '/patient/:id/last-checkup',
  patientAuthMiddleware,
  getLastCheckup
);

export { patientRouter };
