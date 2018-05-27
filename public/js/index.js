 var socket = io();
 socket.on('connect', function () {
     console.log('Connected to the Server.');
 });

 socket.on('disconnect', function () {
     console.log('Disconnected from Server');
 });

 socket.on('newMessage', function(message) {
     console.log('newMessage', message);
     document.getElementById('message').innerHTML = message.text;
 });