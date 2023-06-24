import { Request, Response } from 'express';
import {
  createPatientModel,
  getPatientModel,
  getPatientsModel,
  getLastCheckupModel,
  updatePatientModel,
  deletePatientModel,
  createAppointmentModel,
  deleteAppointmentModel,
} from '../models/methods/patients';
import { TypeAppointment } from '../types/types';

async function createPatient(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      conditions,
    } = req.body;
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
    const createPatient = await createPatientModel(newPatient);
    res.status(201).json({
      message: 'Patient account created successfully',
      result: createPatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient account' });
  }
}
async function getPatient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const patient = await getPatientModel(id);
    res.status(200).json({
      message: `Welcome, ${patient?.name}!`,
      result: patient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the patient account' });
  }
}

async function logout(req: Request, res: Response) {}
async function getPatients(req: Request, res: Response) {
  try {
    const patients = await getPatientsModel();
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get patients account' });
  }
}

async function updatePatient(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const { name, dateOfBirth, email, password, phoneNumber, address } =
      req.body;
    const updatedPatient = {
      name,
      dateOfBirth,
      email,
      password,
      phoneNumber,
      address,
    };
    const updatePatient = await updatePatientModel(patientId, updatedPatient);
    res.status(200).json({
      message: 'Patient account updated successfully',
      result: updatePatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update patient account' });
  }
}
async function deletePatient(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const deletedPatient = await deletePatientModel(id);
    res.status(200).json({
      message: 'Patient account deleted successfully',
      result: deletedPatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete patient account' });
  }
}

async function getLastCheckup(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const patientLastCheckup = await getLastCheckupModel(patientId);
    res.status(200).send(patientLastCheckup);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get patient last checkup' });
  }
}

async function createAppointment(req: Request, res: Response) {
  try {
    const { date, time, attended, illness } = req.body;
    const newAppointment = {
      date,
      time,
      attended,
      illness,
    } as TypeAppointment;
    const createAppointment = await createAppointmentModel(newAppointment);
    res.status(201).json({
      message: 'Appointment created successfully',
      result: createAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a appointment' });
  }
}

async function deleteAppointment(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const deletedAppointment = await deleteAppointmentModel(id);
    res.status(200).json({
      message: 'Appointment deleted successfully',
      result: deletedAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete appointment' });
  }
}
export {
  createPatient,
  getPatient,
  logout,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  createAppointment,
  deleteAppointment,
};
