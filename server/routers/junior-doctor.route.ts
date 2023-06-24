import express from "express";
import { Router } from "express";
import {
    createJuniorDoctor, getJuniorDoctor, createJuniorNote, loginJuniorDoctor
} from "../controllers/junior-doctor.controller";
import { juniorDoctorAuthMiddleware } from '../middleware/authentication';



const juniorDoctorRouter = Router();



juniorDoctorRouter.post('/junior-doctor', createJuniorDoctor);
juniorDoctorRouter.post('/junior/login', loginJuniorDoctor )
juniorDoctorRouter.get('/junior-doctor/:id',juniorDoctorAuthMiddleware,  getJuniorDoctor);
juniorDoctorRouter.post('/junior-doctor/:id/note', createJuniorNote);

export {juniorDoctorRouter};