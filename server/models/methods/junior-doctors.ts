import { TypeJuniorDoctor } from '../../types/types';
import { Message } from '../schema/Message';
import { Patient } from '../schema/Patient';
import db from '../schema/index';
const PatientDB = db.Patient;
const JuniorDoctorDB = db.JuniorDoctor;
async function createJuniorDoctorModel(juniorDoctor: TypeJuniorDoctor) {
  try {
    const newJuniorDoctor = await JuniorDoctorDB.create(juniorDoctor);
    return newJuniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function getJuniorDoctorModel(juniorId: string) {
  try {
    const juniorDoctor = await JuniorDoctorDB.findOne({
      where: { id: juniorId },
      include: {
        model: Message,
        as: 'juniorMessages',
      },
    });
    return juniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function createJuniorNoteModel(juniorNote: string, patientId: string) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    patient.juniorNotes = juniorNote;
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}
export { createJuniorDoctorModel, getJuniorDoctorModel, createJuniorNoteModel };