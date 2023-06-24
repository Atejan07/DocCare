"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const authentication_1 = require("../middleware/authentication");
const app = (0, express_1.default)();
const patientRouter = (0, express_2.Router)();
exports.patientRouter = patientRouter;
patientRouter.post('/patient', authentication_1.patientAuthMiddleware, patient_controller_1.createPatient);
patientRouter.get('/patient/:id', patient_controller_1.getPatient);
patientRouter.get('/patients', patient_controller_1.getPatients);
patientRouter.put('/patient/:id', patient_controller_1.updatePatient);
patientRouter.delete('/patient/:id', patient_controller_1.deletePatient);
patientRouter.get('/patient/:id/last-checkup', patient_controller_1.getLastCheckup);
