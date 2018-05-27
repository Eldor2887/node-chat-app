const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Connected to the Client');

    socket.emit('newEmail', {
        from: 'eldor@gmail.com',
        text: 'Hello world',
        createAt: 123
    });

    socket.emit('newMessage', {
        from: 'eldorado.dip@mail.ru',
        text: 'Hi, how are you?',
        createAt: 2018
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('newMessage from client: ', message);
    });

    socket.on('disconnect', (socket) => {
        console.log('Disconnected from the Client');
    });
});

server.listen(port, () => {
    console.log(`ChatAPP is running on port ${port}`);
});