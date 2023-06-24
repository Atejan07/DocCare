import { Express, Request, Response } from 'express';
import {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel,
} from '../models/methods/doctors';
import { TypeDoctor, TypeMedicalInfo, TypeAvailability } from '../types/types';
import { Doctor } from '../models/schema/Doctor';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";


function createEmptyAvailability() {
  const availability = {} as TypeAvailability;
  for (let day = 1; day <= 31; day++) {
    availability[day] = [];
  }
  return availability;
}

async function createDoctor(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      specialisation,
      phoneNumber,
      address,
      licenseNumber,
      gender,
      about,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
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
    } as TypeDoctor;
    const createDoctor = await createDoctorModel(newDoctor);
    const accessToken = jwt.sign({ id: createDoctor.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Doctor account created successfully',
      result: createDoctor, 
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a doctor account' });
  }
}



async function loginDoctor(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ where: { email: email } });
    if (!doctor) {
      throw new Error('Patient not found');
    }
    const DoctorPassword = doctor.password;
    if (DoctorPassword === null) {
      throw new Error('Patient password is null');
    }
    const validatedPass = await bcrypt.compare(password, DoctorPassword);
    if (!validatedPass) {
      throw new Error('Invalid password');
    }
    const accessToken = jwt.sign({ id: doctor.id }, SECRET_KEY);
    res.status(200).send({ accessToken, doctor });
  } catch (error) {
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
  }
}



async function getDoctor(req: Request, res: Response) {
  try {
    const doctorId = req.params.id;
    const doctor = await getDoctorModel(doctorId);
    res.status(200).send({
      message: `Welcome, ${doctor?.name}!`,
      result: doctor,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the doctor account' });
  }
}
async function getDoctors(req: Request, res: Response) {
  try {
    const doctors = await getDoctorsModel();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get doctors account' });
  }
}

async function createMedicalInfo(req: Request, res: Response) {
  try {
    const { prescription, doctorsNotes, patientId } = req.body;
    const doctorId = req.params.id;
    const newMedicalInfo = {
      prescription,
      doctorsNotes,
      doctorId,
    } as TypeMedicalInfo;
    const createMedicalInfo = await createMedicalInfoModel(
      newMedicalInfo,
      patientId
    );
    res.status(201).json({
      message: 'Medical info created successfully',
      result: createMedicalInfo,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a medical info' });
  }
}

async function createPatientSummary(req: Request, res: Response) {
  try {
    const { patientId, patientSummary, doctorName } = req.body;
    const newSummary = `${patientSummary} by: ${doctorName}`;
    const createPatientSummary = await createPatientSummaryModel(
      newSummary,
      patientId
    );
    res.status(201).json({
      message: 'Patient summary created successfully',
      result: createPatientSummary,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient summary' });
  }
}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  createMedicalInfo,
  createPatientSummary,
  loginDoctor,
};
