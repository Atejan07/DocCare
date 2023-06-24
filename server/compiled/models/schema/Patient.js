"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const sequelize_1 = require("sequelize");
class Patient extends sequelize_1.Model {
    static initModel(sequelize) {
        Patient.init({
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
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            dateOfBirth: {
                type: sequelize_1.DataTypes.DATEONLY,
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female'),
            },
            juniorNotes: {
                type: sequelize_1.DataTypes.STRING,
            },
            summary: {
                type: sequelize_1.DataTypes.STRING,
            },
            conditions: {
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
        return Patient;
    }
}
exports.Patient = Patient;
