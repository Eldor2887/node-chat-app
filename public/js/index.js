 var socket = io();
 socket.on('connect', function () {
     console.log('Connected to the Server.');

     socket.emit('createEmail', {
         to: 'eldorcodes@gmail.com',
         text: 'Hello from client side'
     });

     socket.emit('createMessage', {
         to: 'eldorcodes@gmail.com',
         text: 'Hello server side!'
     });
 });

 socket.on('disconnect', function () {
     console.log('Disconnected from Server');
 });

 socket.on('newMessage', (message) => {
     console.log('newMessage', message);
     document.getElementById('message').innerHTML = message.text;
 });

 socket.on('newEmail', function (email) {
     console.log('New email', email);
 });