import { Router } from 'express';
import {
  createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
  loginDoctor,
  attendAppointment,
} from '../controllers/doctor.controller';
import { doctorAuthMiddleware } from '../middleware/authorization';

const doctorRouter = Router();

doctorRouter.post('/doctor/register', createDoctor);
doctorRouter.post('/doctor/login', loginDoctor);
doctorRouter.get('/doctor', doctorAuthMiddleware, getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.put(
  '/doctor/medical-info/:patientId',
  doctorAuthMiddleware,
  createMedicalInfo
);
doctorRouter.put(
  '/doctor/summary/:patientId',
  doctorAuthMiddleware,
  createPatientSummary
);
doctorRouter.put(
  '/doctor/attend/:appointmentId',
  doctorAuthMiddleware,
  attendAppointment
);

export { doctorRouter };
