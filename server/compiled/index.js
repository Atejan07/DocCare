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
const express_1 = __importDefault(require("express"));
const messages_1 = require("./models/methods/messages");
const cors_1 = __importDefault(require("cors"));
const patient_route_1 = require("./routers/patient.route");
const messages_route_1 = require("./routers/messages.route");
const junior_doctor_route_1 = require("./routers/junior-doctor.route");
const doctor_route_1 = require("./routers/doctor.route");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const corsConfig = {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
};
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: corsConfig
});
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use(patient_route_1.patientRouter);
app.use(messages_route_1.messagesRouter);
app.use(junior_doctor_route_1.juniorDoctorRouter);
app.use(doctor_route_1.doctorRouter);
io.use((socket, next) => {
    // here we check if there is a name in the socket
    // we assigned this property in the frontend
    const name = socket.handshake.auth.name;
    if (!name) {
        // if there isnt a name we throw an error and refuse the connection
        return next(new Error("invalid username"));
    }
    // if we manage to get here it means they have been authenticated
    // so we call next to go to the next middleware
    next();
});
io.on('connection', (socket) => {
    socket.broadcast.emit('patient logged');
    // socket.to('junior').emit('patient logged')
    // 'socket.join(room name)' would let us join the private room
    // but if its not there it will create it so in this case
    // we are using it to create a private room
    const newRoom = socket.handshake.auth.name;
    if (newRoom === 'junior') {
        socket.join('junior');
    }
    else {
        socket.join(newRoom);
    }
    // here we check the events that are coming in from the frontend
    // we have created this 'from junior' from frontend
    // so this means when you detect an event called 'from junior' do the following
    socket.on('from junior', (message, receiver) => __awaiter(void 0, void 0, void 0, function* () {
        //this saves it to the database
        const newMessage = yield (0, messages_1.sendMessageModel)(message);
        logger_1.default.warn(newMessage);
        // socket.to(room name) would send a message only to that room
        // to all clients on the socket in room 'receiver' except the sender
        socket.to(receiver).emit('from junior', newMessage);
        // socket.to('junior').emit('junior sent', newMessage)
    }));
    socket.on('patient message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = yield (0, messages_1.sendMessageModel)(message);
        logger_1.default.warn(newMessage);
        socket.to('junior').emit('patient message', newMessage);
        // socket.to(message.sender_name).emit('patient sent', newMessage)
        socket.broadcast.emit('patient logged');
    }));
    logger_1.default.warn(newRoom);
    socket.on('patient logged', (args) => {
        logger_1.default.info('logged', args);
        socket.broadcast.emit('patient logged');
    });
});
server.listen(port, () => {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
});
