"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const messages_controller_1 = require("../controllers/messages.controller");
const app = (0, express_1.default)();
const messagesRouter = (0, express_2.Router)();
exports.messagesRouter = messagesRouter;
messagesRouter.post('/message', messages_controller_1.sendMessage);
messagesRouter.get('/messages', messages_controller_1.getMessages);
