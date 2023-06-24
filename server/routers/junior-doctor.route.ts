import express from "express";
import { Router } from "express";
import {
    createJuniorDoctor, getJuniorDoctor, createJuniorNote
} from "../controllers/junior-doctor.controller";
import { juniorDoctorAuthMiddleware } from '../middleware/authentication';



const juniorDoctorRouter = Router();



juniorDoctorRouter.post('/junior-doctor', createJuniorDoctor);
juniorDoctorRouter.get('/junior-doctor/:id',juniorDoctorAuthMiddleware,  getJuniorDoctor);
juniorDoctorRouter.post('/junior-doctor/:id/note', createJuniorNote);

export {juniorDoctorRouter};