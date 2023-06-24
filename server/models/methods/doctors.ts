import db from '../schema/index';
import { TypeDoctor, TypeMedicalInfo } from '../../types/types';
import { Patient } from '../schema/Patient';
import { Appointment } from '../schema/Appointment';

const DoctorDB = db.Doctor;
const PatientDB = db.Patient;
const MedicalInfoDB = db.MedicalInfo;

async function createDoctorModel(doctor: TypeDoctor) {
  try {
    const newDoctor = await DoctorDB.create(doctor);
    return newDoctor;
  } catch (error) {
    throw new Error();
  }
}

async function getDoctorModel(id: string) {
  try {
    const doctor = await DoctorDB.findOne({
      where: { id: id },
      include: [
        {
          model: Appointment,
          as: 'doctorAppointments',
        },
        {
          model: Patient,
          as: 'patients',
        },
      ],
    });
    return doctor;
  } catch (error) {
    throw new Error();
  }
}

async function getDoctorsModel() {
  try {
    const doctors = await DoctorDB.findAll({
      include: [
        {
          model: Appointment,
          as: 'doctorAppointments',
        },
        {
          model: Patient,
          as: 'patients',
        },
      ],
    });
    return doctors;
  } catch (error) {
    throw new Error();
  }
}

async function createMedicalInfoModel(
  newMedicalInfo: TypeMedicalInfo,
  patientId: string
) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    const medicalInfo = await MedicalInfoDB.create(newMedicalInfo);
    patient.medicalInfo = medicalInfo;
    patient.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function createPatientSummaryModel(
  newPatientSummary: string,
  patientId: string
) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    patient.summary = newPatientSummary;
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

export {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel,
};
