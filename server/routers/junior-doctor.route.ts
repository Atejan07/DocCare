import express from 'express';
import { Router } from 'express';
import {
  createJuniorDoctor,
  getJuniorDoctor,
  createJuniorNote,
  loginJuniorDoctor,
} from '../controllers/junior-doctor.controller';
import { juniorDoctorAuthMiddleware } from '../middleware/authorization';

const juniorDoctorRouter = Router();

juniorDoctorRouter.post('/junior-doctor/register', createJuniorDoctor);
juniorDoctorRouter.post('/junior-doctor/login', loginJuniorDoctor);
juniorDoctorRouter.get(
  '/junior-doctor',
  juniorDoctorAuthMiddleware,
  getJuniorDoctor
);
juniorDoctorRouter.post(
  '/junior-doctor/:patientId/note',
  juniorDoctorAuthMiddleware,
  createJuniorNote
);

export { juniorDoctorRouter };
