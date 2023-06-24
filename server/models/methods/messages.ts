import { TypeMessage } from '../../types/types';
import db from '../schema/index';

const MessageDB = db.Message;

async function sendMessageModel(message: TypeMessage) {
  try {
    const newMessage = await MessageDB.create(message);
    return newMessage;
  } catch (error) {
    throw new Error();
  }
}

async function getMessagesModel() {
  try {
    const messages = await MessageDB.findAll();
    return messages;
  } catch (error) {
    throw new Error();
  }
}

export { sendMessageModel, getMessagesModel };
