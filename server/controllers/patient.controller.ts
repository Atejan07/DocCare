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
import { Patient } from '../models/schema/Patient'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 12;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";


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
    const hashedPassword = await bcrypt.hash(password, saltRounds);
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
    const createPatient = await createPatientModel(newPatient);
    const accessToken = jwt.sign({ id: createPatient.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Patient account created successfully',
      result: createPatient,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient account' });
  }
}

async function loginPatient(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ where: { email: email } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    const patientPassword = patient.password;
    if (patientPassword === null) {
      throw new Error('Patient password is null');
    }
    const validatedPass = await bcrypt.compare(password, patientPassword);
    if (!validatedPass) {
      throw new Error('Invalid password');
    }
    const accessToken = jwt.sign({ id: patient.id }, SECRET_KEY);
    res.status(200).send({ accessToken, patient });
  } catch (error) {
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
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

async function logout(req: Request, res: Response) { }
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
  loginPatient,
};
