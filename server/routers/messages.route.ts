import express from 'express';
import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messages.controller';

const app = express();
const messagesRouter = Router();

messagesRouter.post('/message', sendMessage);
messagesRouter.get('/messages', getMessages);

export { messagesRouter };
