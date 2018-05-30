const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Connected to the Client');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from Server');
    });

    socket.on('disconnect', (socket) => {
        console.log('Disconnected from the Client');
    });
});

server.listen(port, () => {
    console.log(`ChatAPP is running on port ${port}`);
});