import express, { Express } from 'express';
import { sendMessageModel } from './models/methods/messages';
import cors from 'cors';
import { patientRouter } from './routers/patient.route';
import { messagesRouter } from './routers/messages.route';
import { juniorDoctorRouter } from './routers/junior-doctor.route';
import { doctorRouter } from './routers/doctor.route';
import {createServer} from 'http'
import { Server } from 'socket.io';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config();


const corsConfig = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT;

const server = createServer(app)

const io = new Server(server, {
  cors: corsConfig
})

app.use(cors(corsConfig));
app.use(express.json());
app.use(patientRouter);
app.use(messagesRouter);
app.use(juniorDoctorRouter);
app.use(doctorRouter);


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
  socket.broadcast.emit('patient logged')
  
  // socket.to('junior').emit('patient logged')

  // 'socket.join(room name)' would let us join the private room
  // but if its not there it will create it so in this case
  // we are using it to create a private room
  const newRoom = socket.handshake.auth.name
  if(newRoom === 'junior') {
    socket.join('junior')
  } else {
    socket.join(newRoom)
    
  }

  // here we check the events that are coming in from the frontend
  // we have created this 'from junior' from frontend
  // so this means when you detect an event called 'from junior' do the following
  socket.on('from junior', async (message, receiver) => {
    //this saves it to the database
    const newMessage = await sendMessageModel(message)
    logger.warn(newMessage)
    // socket.to(room name) would send a message only to that room
    // to all clients on the socket in room 'receiver' except the sender
    socket.to(receiver).emit('from junior', newMessage)
    // socket.to('junior').emit('junior sent', newMessage)
    
  })
  socket.on('patient message', async (message) => {
    const newMessage = await sendMessageModel(message)
    logger.warn(newMessage)
    socket.to('junior').emit('patient message', newMessage)
    // socket.to(message.sender_name).emit('patient sent', newMessage)
    socket.broadcast.emit('patient logged')
    
  })
  logger.warn(newRoom)

  socket.on('patient logged' , (args) => {
    logger.info('logged', args)
    socket.broadcast.emit('patient logged')
  })
});

server.listen(port,() => {
  logger.info(`Server is running at http://localhost:${port}`);
  
});
