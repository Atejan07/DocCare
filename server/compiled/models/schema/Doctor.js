"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
class Doctor extends sequelize_1.Model {
    static initModel(sequelize) {
        Doctor.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
            },
            specialisation: {
                type: sequelize_1.DataTypes.ENUM('General Practice', 'Internal Medicine', 'Pediatrics', 'Obstetrics and Gynecology', 'Surgery', 'Psychiatry', 'Dermatology', 'Ophthalmology', 'Ear Nose and Throat (ENT)', 'Cardiology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology'),
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            licenseNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female'),
            },
            about: {
                type: sequelize_1.DataTypes.STRING,
            },
            availability: {
                type: sequelize_1.DataTypes.JSON,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize,
        });
        return Doctor;
    }
}
exports.Doctor = Doctor;
