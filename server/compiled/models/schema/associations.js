"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.MedicalInfo = exports.Message = exports.JuniorDoctor = exports.Patient = exports.Appointment = exports.Doctor = void 0;
const Doctor_1 = require("./Doctor");
Object.defineProperty(exports, "Doctor", { enumerable: true, get: function () { return Doctor_1.Doctor; } });
const Appointment_1 = require("./Appointment");
Object.defineProperty(exports, "Appointment", { enumerable: true, get: function () { return Appointment_1.Appointment; } });
const Patient_1 = require("./Patient");
Object.defineProperty(exports, "Patient", { enumerable: true, get: function () { return Patient_1.Patient; } });
const JuniorDoctor_1 = require("./JuniorDoctor");
Object.defineProperty(exports, "JuniorDoctor", { enumerable: true, get: function () { return JuniorDoctor_1.JuniorDoctor; } });
const Message_1 = require("./Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return Message_1.Message; } });
const MedicalInfo_1 = require("./MedicalInfo");
Object.defineProperty(exports, "MedicalInfo", { enumerable: true, get: function () { return MedicalInfo_1.MedicalInfo; } });
function initModels(sequelize) {
    Doctor_1.Doctor.initModel(sequelize);
    Appointment_1.Appointment.initModel(sequelize);
    Patient_1.Patient.initModel(sequelize);
    JuniorDoctor_1.JuniorDoctor.initModel(sequelize);
    Message_1.Message.initModel(sequelize);
    MedicalInfo_1.MedicalInfo.initModel(sequelize);
    Doctor_1.Doctor.hasMany(Appointment_1.Appointment, {
        as: 'doctorAppointments',
        foreignKey: 'doctor_id',
    });
    Doctor_1.Doctor.hasMany(Patient_1.Patient, {
        as: 'patients',
        foreignKey: 'doctor_id',
    });
    Appointment_1.Appointment.belongsTo(Doctor_1.Doctor, {
        as: 'doctorAppointment',
        foreignKey: 'doctor_appointment_id',
    });
    Appointment_1.Appointment.belongsTo(Patient_1.Patient, {
        as: 'patientAppointment',
        foreignKey: 'patient_appointment_id',
    });
    Patient_1.Patient.hasMany(Message_1.Message, {
        as: 'patientMessages',
        foreignKey: 'patient_id',
    });
    Patient_1.Patient.hasMany(Appointment_1.Appointment, {
        as: 'patientAppointments',
        foreignKey: 'patient_id',
    });
    Patient_1.Patient.hasOne(MedicalInfo_1.MedicalInfo, {
        as: 'medicalInfo',
        foreignKey: 'patient_id',
    });
    JuniorDoctor_1.JuniorDoctor.hasMany(Message_1.Message, {
        as: 'juniorMessages',
        foreignKey: 'junior_doctor_id',
    });
    return {
        Doctor: Doctor_1.Doctor,
        Appointment: Appointment_1.Appointment,
        Patient: Patient_1.Patient,
        JuniorDoctor: JuniorDoctor_1.JuniorDoctor,
        Message: Message_1.Message,
        MedicalInfo: MedicalInfo_1.MedicalInfo,
    };
}
exports.initModels = initModels;
