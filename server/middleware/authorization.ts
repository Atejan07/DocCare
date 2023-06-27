import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Patient } from '../models/schema/Patient';
import { Doctor } from '../models/schema/Doctor';
import { JuniorDoctor } from '../models/schema/JuniorDoctor';

const SECRET_KEY = process.env.SECRET_KEY as string;

declare module 'express' {
  interface Request {
    patient?: Patient;
    doctor?: Doctor;
    juniorDoctor?: JuniorDoctor;
  }
}

const patientAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const patient = await Patient.findOne({ where: { id } });
    if (!patient) return res.sendStatus(401);
    req.patient = patient;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const doctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  console.log(token);
  try {
    console.log(token);
    console.log(jwt.verify(token, SECRET_KEY));
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    console.log(id);
    const doctor = await Doctor.findOne({ where: { id } });
    if (!doctor) return res.sendStatus(401);
    req.doctor = doctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const juniorDoctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    console.log(token);
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    console.log(id);
    const juniorDoctor = await JuniorDoctor.findOne({ where: { id } });
    console.log(juniorDoctor);
    if (!juniorDoctor) return res.sendStatus(401);
    req.juniorDoctor = juniorDoctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const anyDoctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const juniorDoctor = await JuniorDoctor.findOne({ where: { id } });
    const doctor = await Doctor.findOne({ where: { id } });
    if (!doctor && !juniorDoctor) return res.sendStatus(401);
    if (doctor) req.doctor = doctor;
    if (juniorDoctor) req.juniorDoctor = juniorDoctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export {
  patientAuthMiddleware,
  doctorAuthMiddleware,
  juniorDoctorAuthMiddleware,
  anyDoctorAuthMiddleware,
};