import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messages.controller';


const messagesRouter = Router();

messagesRouter.post('/message', sendMessage);
messagesRouter.get('/messages', getMessages);

export { messagesRouter };
