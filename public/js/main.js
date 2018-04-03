var socket = io();
let input = document.getElementById('text');
let ol = document.getElementById('msg');

socket.on('connect', () => {
  console.log('Connected to server');

  
});

socket.on('disconnect' , () => {
  console.log('Disconected')
});

socket.on('newMessage', (message) => {
  let formatedTime = moment(message.createAt).format('h:mm a');
  let li = document.createElement('li');
  let content = document.createTextNode(`${message.from} at ${formatedTime} : ${message.text}`);
  li.appendChild(content);
  ol.appendChild(li);
  console.log(message);
});


socket.on('newLocationMessage', (message) => {
  let li = document.createElement('li');
  let formatedTime = moment(message.createAt).format('h:mm a');
  let content = document.createTextNode(`${message.from} at ${formatedTime} : `);
  let link = document.createElement('a');
  let linkText = document.createTextNode("Open location");
  link.title = "Open location";
  link.appendChild(linkText);
  link.setAttribute('href', message.url );
  link.setAttribute('target', '_blank' );
  li.appendChild(content);
  li.appendChild(link);
  ol.appendChild(li);
  console.log(message);
});

document.getElementById('btn_enviar').addEventListener('click', () => {
  socket.emit('createMessage', {
    from: 'user',
    text: input.value
  }, (data) => {
    input.value = "";
    console.log('got it', data);
  });

});

document.getElementById('btn_geo_loc').addEventListener('click', () => {
  if (!navigator.geolocation)
    return alert('No soported by the browser');

  navigator.geolocation.getCurrentPosition( (pos) =>{
    console.log(pos);
    socket.emit('createLocationMessage',{
      lat : pos.coords.latitude,
      lon : pos.coords.longitude,
    });
  } , (error) => {
    console.log( error );
    alert('unable to fetch location');
  },{ enableHighAccuracy: true });

});