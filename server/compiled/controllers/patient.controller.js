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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPatient = exports.deleteAppointment = exports.createAppointment = exports.getLastCheckup = exports.deletePatient = exports.updatePatient = exports.getPatients = exports.logout = exports.getPatient = exports.createPatient = void 0;
const patients_1 = require("../models/methods/patients");
const index_1 = __importDefault(require(".././models/schema/index"));
const PatientDB = index_1.default.Patient;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 12;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
function createPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, dateOfBirth, gender, conditions, } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const newPatient = {
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                address,
                dateOfBirth,
                gender,
                conditions,
            };
            const createPatient = yield (0, patients_1.createPatientModel)(newPatient);
            const accessToken = jsonwebtoken_1.default.sign({ id: createPatient.id }, SECRET_KEY);
            res.status(201).json({
                message: 'Patient account created successfully',
                result: createPatient,
                accessToken,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a patient account' });
        }
    });
}
exports.createPatient = createPatient;
function loginPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const patient = yield PatientDB.findOne({ where: { email: email } });
            if (!patient) {
                throw new Error('Patient not found');
            }
            const patientPassword = patient.password;
            if (!patientPassword) {
                throw new Error('Patient password is null');
            }
            const validatedPass = yield bcrypt_1.default.compare(password, patientPassword);
            if (!validatedPass) {
                throw new Error('Invalid password');
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: patient.id }, SECRET_KEY);
            res.status(200).json({ accessToken, patient });
        }
        catch (error) {
            res.status(401).json({ error: 'Username or password is incorrect' });
        }
    });
}
exports.loginPatient = loginPatient;
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
