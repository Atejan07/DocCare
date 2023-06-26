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
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const patient = await Patient.findOne({ where: { id: id } });
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

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const doctor = await Doctor.findOne({ where: { id: id } });
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
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const juniorDoctor = await JuniorDoctor.findOne({ where: { id: id } });
    if (!juniorDoctor) return res.sendStatus(401);
    req.juniorDoctor = juniorDoctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export {
  patientAuthMiddleware,
  doctorAuthMiddleware,
  juniorDoctorAuthMiddleware,
};
