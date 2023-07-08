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
exports.createJuniorNoteModel = exports.getJuniorDoctorModel = exports.createJuniorDoctorModel = void 0;
const Message_1 = require("../schema/Message");
const index_1 = __importDefault(require("../schema/index"));
const PatientDB = index_1.default.Patient;
const JuniorDoctorDB = index_1.default.JuniorDoctor;
function createJuniorDoctorModel(juniorDoctor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newJuniorDoctor = yield JuniorDoctorDB.create(juniorDoctor);
            newJuniorDoctor.password = null;
            return newJuniorDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createJuniorDoctorModel = createJuniorDoctorModel;
function getJuniorDoctorModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const juniorDoctor = yield JuniorDoctorDB.findOne({
                where: { id },
                include: {
                    model: Message_1.Message,
                    as: 'juniorMessages',
                    required: false,
                },
            });
            juniorDoctor.password = null;
            return juniorDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getJuniorDoctorModel = getJuniorDoctorModel;
function createJuniorNoteModel(patientId, juniorNote) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield PatientDB.findOne({
                where: { id: patientId },
            }));
            patient.juniorNotes = juniorNote;
            yield patient.save();
            console.log(patient);
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createJuniorNoteModel = createJuniorNoteModel;
