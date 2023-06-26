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


doctorRouter.post('/doctor/register', createDoctor);
doctorRouter.post('/doctor/login', loginDoctor )
doctorRouter.get('/doctor/:id', getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.post('/doctor/:id/medical-info',  doctorAuthMiddleware, createMedicalInfo)
doctorRouter.put('/doctor/summary', doctorAuthMiddleware, createPatientSummary);

export {doctorRouter};

