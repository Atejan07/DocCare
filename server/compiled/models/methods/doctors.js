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
exports.attendAppointmentModel = exports.createPatientSummaryModel = exports.createMedicalInfoModel = exports.getDoctorsModel = exports.getDoctorModel = exports.createDoctorModel = void 0;
const index_1 = __importDefault(require("../schema/index"));
const Patient_1 = require("../schema/Patient");
const Appointment_1 = require("../schema/Appointment");
const Doctor_1 = require("../schema/Doctor");
const MedicalInfo_1 = require("../schema/MedicalInfo");
const DoctorDB = index_1.default.Doctor;
const PatientDB = index_1.default.Patient;
const MedicalInfoDB = index_1.default.MedicalInfo;
const AppointmentDB = index_1.default.Appointment;
function createDoctorModel(doctor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newDoctor = yield DoctorDB.create(doctor);
            newDoctor.password = null;
            return newDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createDoctorModel = createDoctorModel;
function getDoctorModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = yield DoctorDB.findOne({
                where: { id: id },
                include: [
                    {
                        model: Appointment_1.Appointment,
                        as: 'doctorAppointments',
                        required: false,
                        include: [
                            {
                                model: Patient_1.Patient,
                                as: 'patientAppointment',
                                required: false,
                            },
                        ],
                    },
                    {
                        model: Patient_1.Patient,
                        as: 'patients',
                        required: false,
                        include: [
                            {
                                model: Appointment_1.Appointment,
                                as: 'patientAppointments',
                                required: false,
                                include: [
                                    {
                                        model: Doctor_1.Doctor,
                                        as: 'doctorAppointment',
                                        attributes: { include: ['name', 'licenseNumber'] },
                                        required: false,
                                    },
                                ],
                            },
                            {
                                model: MedicalInfo_1.MedicalInfo,
                                as: 'medicalInfos',
                                required: false,
                            },
                        ],
                    },
                ],
            });
            return doctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getDoctorModel = getDoctorModel;
function getDoctorsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield DoctorDB.findAll({
                include: {
                    model: Appointment_1.Appointment,
                    as: 'doctorAppointments',
                    required: false,
                    include: [
                        {
                            model: Patient_1.Patient,
                            as: 'patientAppointment',
                            required: false,
                            include: [
                                {
                                    model: MedicalInfo_1.MedicalInfo,
                                    as: 'medicalInfos',
                                    required: false,
                                },
                            ],
                        },
                    ],
                },
            });
            doctors.map((doctor) => {
                return (doctor.password = null);
            });
            return doctors;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getDoctorsModel = getDoctorsModel;
function createMedicalInfoModel(newMedicalInfo, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield PatientDB.findOne({
                where: { id: patientId },
            }));
            const medicalInfo = yield MedicalInfoDB.create(newMedicalInfo);
            patient.addMedicalInfo(medicalInfo);
            yield medicalInfo.save();
            return medicalInfo;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createMedicalInfoModel = createMedicalInfoModel;
function createPatientSummaryModel(newPatientSummary, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield PatientDB.findOne({
                where: { id: patientId },
            }));
            patient.summary = newPatientSummary;
            yield patient.save();
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createPatientSummaryModel = createPatientSummaryModel;
function attendAppointmentModel(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointment = (yield AppointmentDB.findOne({
                where: { id: appointmentId },
            }));
            appointment.attended = true;
            yield appointment.save();
            return appointment;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.attendAppointmentModel = attendAppointmentModel;
