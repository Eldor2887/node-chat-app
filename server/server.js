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

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', (socket) => {
        console.log('Disconnected from the Client');
    });
});

server.listen(port, () => {
    console.log(`ChatAPP is running on port ${port}`);
});