"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const authentication_1 = require("../middleware/authentication");
const doctorRouter = (0, express_1.Router)();
exports.doctorRouter = doctorRouter;
doctorRouter.post('/doctor/register', doctor_controller_1.createDoctor);
doctorRouter.post('/doctor/login', doctor_controller_1.loginDoctor);
doctorRouter.get('/doctor/:id', doctor_controller_1.getDoctor);
doctorRouter.get('/doctors', doctor_controller_1.getDoctors);
doctorRouter.post('/doctor/:id/medical-info', doctor_controller_1.createMedicalInfo);
// doctorRouter.post('/doctor/:id/medical-info',  doctorAuthMiddleware, createMedicalInfo)
doctorRouter.put('/doctor/summary', authentication_1.doctorAuthMiddleware, doctor_controller_1.createPatientSummary);
