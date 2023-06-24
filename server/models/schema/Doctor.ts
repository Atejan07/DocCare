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
  Sequelize
} from 'sequelize'
import { TypeAvailability } from '../../types/types'
import type { Appointment } from './Appointment'
import type { Patient } from './Patient'

type DoctorAssociations = 'doctorAppointments' | 'patients';

export class Doctor extends Model<
  InferAttributes<Doctor, { omit: DoctorAssociations }>,
  InferCreationAttributes<Doctor, { omit: DoctorAssociations }>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare email: string | null;
  declare password: string | null;
  declare specialisation:
    | 'General Practice'
    | 'Internal Medicine'
    | 'Pediatrics'
    | 'Obstetrics and Gynecology'
    | 'Surgery'
    | 'Psychiatry'
    | 'Dermatology'
    | 'Ophthalmology'
    | 'Ear Nose and Throat (ENT)'
    | 'Cardiology'
    | 'Endocrinology'
    | 'Gastroenterology'
    | 'Neurology'
    | 'Oncology';
  declare phoneNumber: string | null;
  declare address: string | null;
  declare licenseNumber: string | null;
  declare gender: 'Male' | 'Female';
  declare about: string | null;
  declare availability: TypeAvailability | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Doctor hasMany Appointment (as DoctorAppointments)
  declare doctorAppointments?: NonAttribute<Appointment[]>;
  declare getDoctorAppointments: HasManyGetAssociationsMixin<Appointment>;
  declare setDoctorAppointments: HasManySetAssociationsMixin<
    Appointment,
    number
  >;
  declare addDoctorAppointment: HasManyAddAssociationMixin<Appointment, number>;
  declare addDoctorAppointments: HasManyAddAssociationsMixin<
    Appointment,
    number
  >;
  declare createDoctorAppointment: HasManyCreateAssociationMixin<Appointment>;
  declare removeDoctorAppointment: HasManyRemoveAssociationMixin<
    Appointment,
    number
  >;
  declare removeDoctorAppointments: HasManyRemoveAssociationsMixin<
    Appointment,
    number
  >;
  declare hasDoctorAppointment: HasManyHasAssociationMixin<Appointment, number>;
  declare hasDoctorAppointments: HasManyHasAssociationsMixin<
    Appointment,
    number
  >;
  declare countDoctorAppointments: HasManyCountAssociationsMixin;

  // Doctor hasMany Patient (as Patients)
  declare patients?: NonAttribute<Patient[]>;
  declare getPatients: HasManyGetAssociationsMixin<Patient>;
  declare setPatients: HasManySetAssociationsMixin<Patient, number>;
  declare addPatient: HasManyAddAssociationMixin<Patient, number>;
  declare addPatients: HasManyAddAssociationsMixin<Patient, number>;
  declare createPatient: HasManyCreateAssociationMixin<Patient>;
  declare removePatient: HasManyRemoveAssociationMixin<Patient, number>;
  declare removePatients: HasManyRemoveAssociationsMixin<Patient, number>;
  declare hasPatient: HasManyHasAssociationMixin<Patient, number>;
  declare hasPatients: HasManyHasAssociationsMixin<Patient, number>;
  declare countPatients: HasManyCountAssociationsMixin;

  declare static associations: {
    doctorAppointments: Association<Doctor, Appointment>;
    patients: Association<Doctor, Patient>;
  };

  static initModel(sequelize: Sequelize): typeof Doctor {
    Doctor.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
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
        specialisation: {
          type: DataTypes.ENUM(
            'General Practice',
            'Internal Medicine',
            'Pediatrics',
            'Obstetrics and Gynecology',
            'Surgery',
            'Psychiatry',
            'Dermatology',
            'Ophthalmology',
            'Ear Nose and Throat (ENT)',
            'Cardiology',
            'Endocrinology',
            'Gastroenterology',
            'Neurology',
            'Oncology'
          ),
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        licenseNumber: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female'),
        },
        about: {
          type: DataTypes.STRING,
        },
        availability: {
          type: DataTypes.JSON,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );

    return Doctor;
  }
}
