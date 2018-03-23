var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage',{
    to : 'jen@mail.com',
    text : 'hohohoh'
  });

});

socket.on('disconnect' , () => {
  console.log('Disconected')
});

socket.on('newMessage', (email) => {
  console.log(email);
});