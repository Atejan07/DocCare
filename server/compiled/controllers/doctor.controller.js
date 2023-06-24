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
exports.createPatientSummary = exports.createMedicalInfo = exports.getDoctors = exports.getDoctor = exports.createDoctor = void 0;
const doctors_1 = require("../models/methods/doctors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
function createEmptyAvailability() {
    const availability = {};
    for (let day = 1; day <= 31; day++) {
        availability[day] = [];
    }
    return availability;
}
function createDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, specialisation, phoneNumber, address, licenseNumber, gender, about, } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const newDoctor = {
                name,
                email,
                password: hashedPassword,
                specialisation,
                phoneNumber,
                address,
                licenseNumber,
                gender,
                about,
                availability: createEmptyAvailability(),
            };
            const createDoctor = yield (0, doctors_1.createDoctorModel)(newDoctor);
            const accessToken = jsonwebtoken_1.default.sign({ id: createDoctor.id }, SECRET_KEY);
            res.status(201).json({
                message: 'Doctor account created successfully',
                result: createDoctor,
                accessToken,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a doctor account' });
        }
    });
}
exports.createDoctor = createDoctor;
function getDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorId = req.params.id;
            const doctor = yield (0, doctors_1.getDoctorModel)(doctorId);
            res.status(200).send({
                message: `Welcome, ${doctor === null || doctor === void 0 ? void 0 : doctor.name}!`,
                result: doctor,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the doctor account' });
        }
    });
}
exports.getDoctor = getDoctor;
function getDoctors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield (0, doctors_1.getDoctorsModel)();
            res.status(200).send(doctors);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get doctors account' });
        }
    });
}
exports.getDoctors = getDoctors;
function createMedicalInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { prescription, doctorsNotes, patientId } = req.body;
            const doctorId = req.params.id;
            const newMedicalInfo = {
                prescription,
                doctorsNotes,
                doctorId,
            };
            const createMedicalInfo = yield (0, doctors_1.createMedicalInfoModel)(newMedicalInfo, patientId);
            res.status(201).json({
                message: 'Medical info created successfully',
                result: createMedicalInfo,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a medical info' });
        }
    });
}
exports.createMedicalInfo = createMedicalInfo;
function createPatientSummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { patientId, patientSummary, doctorName } = req.body;
            const newSummary = `${patientSummary} by: ${doctorName}`;
            const createPatientSummary = yield (0, doctors_1.createPatientSummaryModel)(newSummary, patientId);
            res.status(201).json({
                message: 'Patient summary created successfully',
                result: createPatientSummary,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a patient summary' });
        }
    });
}
exports.createPatientSummary = createPatientSummary;
