import express from "express";
import { Router } from "express";
import {
    createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
  loginDoctor,
} from "../controllers/doctor.controller";
import { doctorAuthMiddleware } from '../middleware/authentication';


const doctorRouter = Router();


doctorRouter.post('/doctor', createDoctor);
doctorRouter.post('/doctor/login', loginDoctor )
doctorRouter.get('/doctor/:id', getDoctor);
doctorRouter.get('/doctors', doctorAuthMiddleware, getDoctors);
doctorRouter.post('/doctor/:id/medical-info', createMedicalInfo)
doctorRouter.put('/doctor/summary', createPatientSummary);

export {doctorRouter};

