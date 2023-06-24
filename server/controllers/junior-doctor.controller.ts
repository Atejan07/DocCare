import { Express, Request, Response } from 'express';
import {
  createJuniorDoctorModel,
  getJuniorDoctorModel,
  createJuniorNoteModel,
} from '../models/methods/junior-doctors';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JuniorDoctor } from '../models/schema/JuniorDoctor';
const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

async function createJuniorDoctor(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      licenseNumber,
      gender,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newJuniorDoctor = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      licenseNumber,
      gender,
    };
    const createJuniorDoctor = await createJuniorDoctorModel(newJuniorDoctor);
    const accessToken = jwt.sign({ id: createJuniorDoctor.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Junior doctor account created successfully',
      result: createJuniorDoctor,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a junior doctor account' });
  }
}


async function loginJuniorDoctor(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const jrDoctor = await JuniorDoctor.findOne({ where: { email: email } });
    if (!jrDoctor) {
      throw new Error('Patient not found');
    }
    const juniorDoctorPassword = jrDoctor.password;
    if (juniorDoctorPassword === null) {
      throw new Error('Patient password is null');
    }
    const validatedPass = await bcrypt.compare(password, juniorDoctorPassword);
    if (!validatedPass) {
      throw new Error('Invalid password');
    }
    const accessToken = jwt.sign({ id: jrDoctor.id }, SECRET_KEY);
    res.status(200).send({ accessToken, jrDoctor });
  } catch (error) {
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
  }
}


async function getJuniorDoctor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const juniorDoctor = await getJuniorDoctorModel(id);
    res.status(200).json({
      message: `Welcome, ${juniorDoctor?.name}!`,
      result: juniorDoctor,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the junior doctor account' });
  }
}
async function createJuniorNote(req: Request, res: Response) {
  try {
    const juniorNote = req.body;
    const patientId = req.params.id;
    const createJuniorNote = await createJuniorNoteModel(juniorNote, patientId);
    res.status(201).json({
      message: 'Junior note created successfully',
      result: createJuniorNote,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a junior note' });
  }
}

export { createJuniorDoctor, getJuniorDoctor, createJuniorNote,loginJuniorDoctor };
