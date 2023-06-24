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
exports.patientAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Patient_1 = require("../models/schema/Patient");
const SECRET_KEY = process.env.SECRET_KEY;
const patientAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const patient = yield Patient_1.Patient.findOne({ where: { id: id } });
        if (!patient)
            return res.sendStatus(401);
        req.patient = patient;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
});
exports.patientAuthMiddleware = patientAuthMiddleware;
//.populate("categories")
