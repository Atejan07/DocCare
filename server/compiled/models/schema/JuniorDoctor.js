"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuniorDoctor = void 0;
const sequelize_1 = require("sequelize");
class JuniorDoctor extends sequelize_1.Model {
    static initModel(sequelize) {
        JuniorDoctor.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING
            },
            email: {
                type: sequelize_1.DataTypes.STRING
            },
            password: {
                type: sequelize_1.DataTypes.STRING
            },
            licenseNumber: {
                type: sequelize_1.DataTypes.STRING
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING
            },
            address: {
                type: sequelize_1.DataTypes.STRING
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female')
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            }
        }, {
            sequelize
        });
        return JuniorDoctor;
    }
}
exports.JuniorDoctor = JuniorDoctor;
