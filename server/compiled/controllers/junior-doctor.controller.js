"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginJuniorDoctor = exports.createJuniorNote = exports.getJuniorDoctor = exports.createJuniorDoctor = void 0;
const junior_doctors_1 = require("../models/methods/junior-doctors");
const JuniorDoctor_1 = require("../models/schema/JuniorDoctor");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
function createJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, licenseNumber, gender, profilePicture, } = req.body;
            const newJuniorDoctor = {
                name,
                email,
                password,
                phoneNumber,
                address,
                licenseNumber,
                gender,
                profilePicture,
                userType: 'junior-doctor',
            };
            const createJuniorDoctor = yield (0, junior_doctors_1.createJuniorDoctorModel)(newJuniorDoctor);
            const accessToken = jsonwebtoken_1.default.sign({ id: createJuniorDoctor.id }, SECRET_KEY);
            res.status(201).json({
                message: 'Junior doctor account created successfully',
                result: createJuniorDoctor,
                accessToken,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create a junior doctor account' });
        }
    });
}
exports.createJuniorDoctor = createJuniorDoctor;
function loginJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const juniorDoctor = yield JuniorDoctor_1.JuniorDoctor.findOne({ where: { email } });
            if (!juniorDoctor || juniorDoctor.password === null) {
                res.status(401).json({ error: 'Password and email do not match' });
            }
            else {
                const validatedPass = yield bcrypt_1.default.compare(password, juniorDoctor.password);
                if (validatedPass) {
                    const accessToken = jsonwebtoken_1.default.sign({ id: juniorDoctor.id }, SECRET_KEY);
                    const userAuthenticated = yield (0, junior_doctors_1.getJuniorDoctorModel)(juniorDoctor.id);
                    userAuthenticated.password = null;
                    res.status(200).json({
                        message: `Welcome, ${juniorDoctor === null || juniorDoctor === void 0 ? void 0 : juniorDoctor.name}!`,
                        result: { accessToken, userAuthenticated },
                    });
                }
            }
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to login' });
        }
    });
}
exports.loginJuniorDoctor = loginJuniorDoctor;
function getJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const auth = req.juniorDoctor;
            const id = auth === null || auth === void 0 ? void 0 : auth.id;
            const juniorDoctor = yield (0, junior_doctors_1.getJuniorDoctorModel)(id);
            res.status(200).send(juniorDoctor);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the junior doctor account' });
        }
    });
}
exports.getJuniorDoctor = getJuniorDoctor;
function createJuniorNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { juniorNote } = req.body;
            const patientId = req.params.patientId;
            const createJuniorNote = yield (0, junior_doctors_1.createJuniorNoteModel)(patientId, juniorNote);
            res.status(200).json({
                message: 'Junior note created successfully',
                result: createJuniorNote,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a junior note' });
        }
    });
}
exports.createJuniorNote = createJuniorNote;
