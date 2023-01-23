
import { io } from 'socket.io-client';
var socket;

// if(import.meta.env.VITE_ENV == 'prod') socket = io();
// else 
    socket = io(import.meta.env.VITE_SOCKET_URL, { autoConnect: true, transports: ['websocket'] });

export default socket;