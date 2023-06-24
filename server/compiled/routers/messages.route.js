"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = require("express");
const messages_controller_1 = require("../controllers/messages.controller");
const messagesRouter = (0, express_1.Router)();
exports.messagesRouter = messagesRouter;
messagesRouter.post('/message', messages_controller_1.sendMessage);
messagesRouter.get('/messages', messages_controller_1.getMessages);
