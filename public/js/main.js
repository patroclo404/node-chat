var socket = io();
let input = document.getElementById('text');
let ol = document.getElementById('msg');

socket.on('connect', () => {
  console.log('Connected to server');

  
});

socket.on('disconnect' , () => {
  console.log('Disconected')
});

socket.on('newMessage', (email) => {
  let li = document.createElement('li');
  let content = document.createTextNode(`${email.from} : ${email.text}`);
  li.appendChild(content);
  ol.appendChild(li);
  console.log(email);
});


// socket.emit('createMessage',{
//   from : 'jen@mail.com',
//   text : 'hohohoh'
// }, (data) => {
//   console.log('got it', data);
// });


document.getElementById('btn_enviar').addEventListener('click', () => {


  socket.emit('createMessage', {
    from: 'user',
    text: input.value
  }, (data) => {
    console.log('got it', data);
  });

})