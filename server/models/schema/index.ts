import { Sequelize } from 'sequelize';
import { initModels } from './associations';
import dotenv from 'dotenv';
dotenv.config();

const dbName = 'DocCare';

const db = new Sequelize(
  dbName,
  'root',
  'Codeworks',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  }
);

const { Message, Appointment, Doctor, JuniorDoctor, MedicalInfo, Patient } =
  initModels(db);

(async function authenticate() {
  try {
    await db.sync();
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default {
  db,
  Message,
  Appointment,
  Doctor,
  JuniorDoctor,
  MedicalInfo,
  Patient,
};
