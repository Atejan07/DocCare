import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import type { Appointment } from './Appointment';
import type { MedicalInfo } from './MedicalInfo';
import type { Message } from './Message';
const saltRounds = 12;
import bcrypt from 'bcrypt';

type PatientAssociations =
  | 'patientMessages'
  | 'patientAppointments'
  | 'medicalInfos';

export class Patient extends Model<
  InferAttributes<Patient, { omit: PatientAssociations }>,
  InferCreationAttributes<Patient, { omit: PatientAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare email: string | null;
  declare password: string | null;
  declare phoneNumber: string | null;
  declare address: string | null;
  declare dateOfBirth: string | null;
  declare gender: 'Male' | 'Female' | 'Other' | null;
  declare profilePicture: string | null;
  declare juniorNotes?: string | null;
  declare summary: string | null;
  declare allergies: string | null;
  declare bloodType: string | null;
  declare medications: string | null;
  declare surgicalHistory: string | null;
  declare familyMedicalHistory: string | null;
  declare status: 'Online' | 'Offline';
  declare userType: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Patient hasMany Message (as PatientMessages)
  declare patientMessages?: NonAttribute<Message[]>;
  declare getPatientMessages: HasManyGetAssociationsMixin<Message>;
  declare setPatientMessages: HasManySetAssociationsMixin<Message, number>;
  declare addPatientMessage: HasManyAddAssociationMixin<Message, number>;
  declare addPatientMessages: HasManyAddAssociationsMixin<Message, number>;
  declare createPatientMessage: HasManyCreateAssociationMixin<Message>;
  declare removePatientMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removePatientMessages: HasManyRemoveAssociationsMixin<
    Message,
    number
  >;
  declare hasPatientMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasPatientMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countPatientMessages: HasManyCountAssociationsMixin;
  // Patient hasMany Appointment (as PatientAppointment)
  declare patientAppointments?: NonAttribute<Appointment[]>;
  declare getPatientAppointments: HasManyGetAssociationsMixin<Appointment>;
  declare setPatientAppointments: HasManySetAssociationsMixin<
    Appointment,
    number
  >;
  declare addPatientAppointment: HasManyAddAssociationMixin<
    Appointment,
    number
  >;
  declare addPatientAppointments: HasManyAddAssociationsMixin<
    Appointment,
    number
  >;
  declare createPatientAppointment: HasManyCreateAssociationMixin<Appointment>;
  declare removePatientAppointment: HasManyRemoveAssociationMixin<
    Appointment,
    number
  >;
  declare removePatientAppointments: HasManyRemoveAssociationsMixin<
    Appointment,
    number
  >;
  declare hasPatientAppointment: HasManyHasAssociationMixin<
    Appointment,
    number
  >;
  declare hasPatientAppointments: HasManyHasAssociationsMixin<
    Appointment,
    number
  >;
  declare countPatientAppointments: HasManyCountAssociationsMixin;

  // Patient hasMany MedicalInfo (as MedicalInfo)
  declare medicalInfos?: NonAttribute<MedicalInfo[]>;
  declare getMedicalInfos: HasManyGetAssociationsMixin<MedicalInfo>;
  declare setMedicalInfos: HasManySetAssociationsMixin<MedicalInfo, number>;
  declare addMedicalInfo: HasManyAddAssociationMixin<MedicalInfo, number>;
  declare addMedicalInfos: HasManyAddAssociationsMixin<MedicalInfo, number>;
  declare createMedicalInfo: HasManyCreateAssociationMixin<MedicalInfo>;
  declare removeMedicalInfo: HasManyRemoveAssociationMixin<MedicalInfo, number>;
  declare removeMedicalInfos: HasManyRemoveAssociationsMixin<
    MedicalInfo,
    number
  >;
  declare hasMedicalInfo: HasManyHasAssociationMixin<MedicalInfo, number>;
  declare hasMedicalInfos: HasManyHasAssociationsMixin<MedicalInfo, number>;
  declare countMedicalInfos: HasManyCountAssociationsMixin;

  declare static associations: {
    patientMessages: Association<Patient, Message>;
    patientAppointments: Association<Patient, Appointment>;
    medicalInfos: Association<Patient, MedicalInfo>;
  };
  static initModel(sequelize: Sequelize): typeof Patient {
    Patient.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        dateOfBirth: {
          type: DataTypes.DATEONLY,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female', 'Other'),
        },
        profilePicture: {
          type: DataTypes.STRING,
        },
        juniorNotes: {
          type: DataTypes.STRING,
        },
        summary: {
          type: DataTypes.STRING,
        },
        allergies: {
          type: DataTypes.STRING,
        },
        bloodType: {
          type: DataTypes.STRING,
        },
        medications: {
          type: DataTypes.STRING,
        },
        surgicalHistory: {
          type: DataTypes.STRING,
        },
        familyMedicalHistory: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM('Online', 'Offline'),
        },
        userType: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        hooks: {
          beforeValidate: async (patient) => {
            patient.id = uuidv4();
          },
          afterCreate: async (patient) => {
            const hashedPassword = await bcrypt.hash(
              patient.password as string,
              saltRounds
            );
            patient.password = hashedPassword;
            patient.status = 'Online';
            await patient.save();
          },
        },
        sequelize,
      }
    );
    return Patient;
  }
}
