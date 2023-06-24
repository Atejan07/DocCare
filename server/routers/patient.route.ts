import express from 'express';
import { Router } from 'express';
import {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  loginPatient,
} from '../controllers/patient.controller';
import { patientAuthMiddleware } from '../middleware/authentication';
import { Patient } from '../models/schema/Patient';

const app = express();
const patientRouter = Router();


patientRouter.post('/patient',createPatient);
patientRouter.post('/patient/login', loginPatient )
patientRouter.get('/patient/:id', patientAuthMiddleware, getPatient);
patientRouter.get('/patients', getPatients);
patientRouter.put('/patient/:id', updatePatient);
patientRouter.delete('/patient/:id', deletePatient);
patientRouter.get('/patient/:id/last-checkup', getLastCheckup);

export { patientRouter };
