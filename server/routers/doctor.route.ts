import express from "express";
import { Router } from "express";
import {
    createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
} from "../controllers/doctor.controller";
import { doctorAuthMiddleware } from '../middleware/authentication';



const app = express();
const doctorRouter = Router();


doctorRouter.post('/doctor', createDoctor);
doctorRouter.get('/doctor/:id', getDoctor);
doctorRouter.get('/doctors', doctorAuthMiddleware, getDoctors);
doctorRouter.post('/doctor/:id/medical-info', createMedicalInfo)
doctorRouter.put('/doctor/summary', createPatientSummary);

export {doctorRouter};

