var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createMessage',{
  //   from : 'jen@mail.com',
  //   text : 'hohohoh'
  // });

});

socket.on('disconnect' , () => {
  console.log('Disconected')
});

socket.on('newMessage', (email) => {
  console.log(email);
});