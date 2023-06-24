import express from 'express';
import { Router } from 'express';
import {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
} from '../controllers/patient.controller';
import { patientAuthMiddleware } from '../middleware/authentication';
import { Patient } from '../models/schema/Patient';

const app = express();
const patientRouter = Router();


patientRouter.post('/patient',patientAuthMiddleware, createPatient);
patientRouter.get('/patient/:id', getPatient);
patientRouter.get('/patients', getPatients);
patientRouter.put('/patient/:id', updatePatient);
patientRouter.delete('/patient/:id', deletePatient);
patientRouter.get('/patient/:id/last-checkup', getLastCheckup);

export { patientRouter };
