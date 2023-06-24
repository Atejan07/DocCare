"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.createAppointment = exports.getLastCheckup = exports.deletePatient = exports.updatePatient = exports.getPatients = exports.logout = exports.getPatient = exports.createPatient = void 0;
const patients_1 = require("../models/methods/patients");
function createPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, dateOfBirth, gender, conditions, } = req.body;
            const newPatient = {
                name,
                email,
                password,
                phoneNumber,
                address,
                dateOfBirth,
                gender,
                conditions,
            };
            const createPatient = yield (0, patients_1.createPatientModel)(newPatient);
            res.status(201).json({
                message: 'Patient account created successfully',
                result: createPatient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a patient account' });
        }
    });
}
exports.createPatient = createPatient;
function getPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const patient = yield (0, patients_1.getPatientModel)(id);
            res.status(200).json({
                message: `Welcome, ${patient === null || patient === void 0 ? void 0 : patient.name}!`,
                result: patient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the patient account' });
        }
    });
}
exports.getPatient = getPatient;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.logout = logout;
function getPatients(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield (0, patients_1.getPatientsModel)();
            res.status(200).send(patients);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get patients account' });
        }
    });
}
exports.getPatients = getPatients;
function updatePatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = req.params.id;
            const { name, dateOfBirth, email, password, phoneNumber, address } = req.body;
            const updatedPatient = {
                name,
                dateOfBirth,
                email,
                password,
                phoneNumber,
                address,
            };
            const updatePatient = yield (0, patients_1.updatePatientModel)(patientId, updatedPatient);
            res.status(200).json({
                message: 'Patient account updated successfully',
                result: updatePatient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to update patient account' });
        }
    });
}
exports.updatePatient = updatePatient;
function deletePatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const deletedPatient = yield (0, patients_1.deletePatientModel)(id);
            res.status(200).json({
                message: 'Patient account deleted successfully',
                result: deletedPatient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to delete patient account' });
        }
    });
}
exports.deletePatient = deletePatient;
function getLastCheckup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = req.params.id;
            const patientLastCheckup = yield (0, patients_1.getLastCheckupModel)(patientId);
            res.status(200).send(patientLastCheckup);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get patient last checkup' });
        }
    });
}
exports.getLastCheckup = getLastCheckup;
function createAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, time, attended, illness } = req.body;
            const newAppointment = {
                date,
                time,
                attended,
                illness,
            };
            const createAppointment = yield (0, patients_1.createAppointmentModel)(newAppointment);
            res.status(201).json({
                message: 'Appointment created successfully',
                result: createAppointment,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a appointment' });
        }
    });
}
exports.createAppointment = createAppointment;
function deleteAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const deletedAppointment = yield (0, patients_1.deleteAppointmentModel)(id);
            res.status(200).json({
                message: 'Appointment deleted successfully',
                result: deletedAppointment,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to delete appointment' });
        }
    });
}
exports.deleteAppointment = deleteAppointment;
