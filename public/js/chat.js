 var socket = io();
 
 function scrollToBottom(){
     // Selectors
     var messages = jQuery('#messages');
     var newMessage = messages.children('li:last-child');
     // Heights
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();

     if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
         messages.scrollTop(scrollHeight);
     }

 }
 socket.on('connect', function () {
     console.log('Connected to the Server.');

     var params = jQuery.deparam(window.location.search);
     socket.emit('join', params, function (err) {
         if (err) {
             alert(err);
             window.location.href = '/';
         } else {
             console.log('No Errors');
         }
     });

 });

 socket.on('disconnect', function () {
     console.log('Disconnected from Server');
 });

 socket.on('updateUserList', function (users) {
     var ol = jQuery('<ol></ol>');
     users.forEach(function (user) {
         var li = jQuery('<li></li>').text(user);
         ol.append(li);
     });
     jQuery('#users').html(ol);
 });

 socket.on('newMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm a');
     var template = jQuery('#message-template').html();
     var html = Mustache.render(template, {
         text: message.text,
         from: message.from,
         createdAt: formattedTime
     });
     jQuery('#messages').append(html);
     scrollToBottom();
 });

 socket.on('newLocationMessage', function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#location-message-template').html();
      var html = Mustache.render(template, {
          from: message.from,
          url: message.url,
          createdAt: formattedTime
      });
      jQuery('#messages').append(html);
      scrollToBottom();
 });

 jQuery('#message-form').on('submit', function(e){
     e.preventDefault();

     var messageTextBox = jQuery('[name=message]');
     socket.emit('createMessage', {
         from: 'User',
         text: messageTextBox.val()
     }, function(){
         messageTextBox.val('')
     });
 });

 var locationBtn = jQuery('#send-location');
locationBtn.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){

        locationBtn.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationBtn.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});