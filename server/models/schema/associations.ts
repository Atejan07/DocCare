import type { Sequelize, Model } from 'sequelize';
import { Doctor } from './Doctor';
import { Appointment } from './Appointment';
import { Patient } from './Patient';
import { JuniorDoctor } from './JuniorDoctor';
import { Message } from './Message';
import { MedicalInfo } from './MedicalInfo';

export { Doctor, Appointment, Patient, JuniorDoctor, Message, MedicalInfo };

export function initModels(sequelize: Sequelize) {
  Doctor.initModel(sequelize);
  Appointment.initModel(sequelize);
  Patient.initModel(sequelize);
  JuniorDoctor.initModel(sequelize);
  Message.initModel(sequelize);
  MedicalInfo.initModel(sequelize);

  Doctor.hasMany(Appointment, {
    as: 'doctorAppointments',
    foreignKey: 'doctor_id',
  });
  Doctor.hasMany(Patient, {
    as: 'patients',
    foreignKey: 'doctor_id',
  });
  Appointment.belongsTo(Doctor, {
    as: 'doctorAppointment',
    foreignKey: 'doctor_appointment_id',
  });
  Appointment.belongsTo(Patient, {
    as: 'patientAppointment',
    foreignKey: 'patient_appointment_id',
  });
  Patient.hasMany(Message, {
    as: 'patientMessages',
    foreignKey: 'patient_id',
  });
  Patient.hasMany(Appointment, {
    as: 'patientAppointments',
    foreignKey: 'patient_id',
  });
  Patient.hasOne(MedicalInfo, {
    as: 'medicalInfo',
    foreignKey: 'patient_id',
  });
  JuniorDoctor.hasMany(Message, {
    as: 'juniorMessages',
    foreignKey: 'junior_doctor_id',
  });

  return {
    Doctor,
    Appointment,
    Patient,
    JuniorDoctor,
    Message,
    MedicalInfo,
  };
}
