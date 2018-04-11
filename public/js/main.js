let socket = io();
let input = document.getElementById('text');
let ol = document.getElementById('msg');

let scrollToBottom = () => {
  
  let messages = $('#msg');
  let newMessage = messages.children('li:last-child');
  
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

};

socket.on('connect', () => {
  console.log('Connected to server');

  
});

socket.on('disconnect' , () => {
  console.log('Disconected')
});

socket.on('newMessage', (message) => {

  let formatedTime = moment(message.createAt).format('h:mm a');
  let tamplate = $('#messgge_template').html();
  let html = Mustache.render(tamplate , {
    text : message.text,
    from : message.from,
    createdAt : formatedTime
  });
  $('#msg').append(html);
  scrollToBottom();
});


socket.on('newLocationMessage', (message) => {

  let formatedTime = moment(message.createAt).format('h:mm a');
  let tamplate = $('#location_template').html();
  let html = Mustache.render(tamplate, {
    from: message.from,
    location: message.url,
    createdAt: formatedTime
  });
  $('#msg').append(html);

});

document.getElementById('btn_enviar').addEventListener('click', () => {
  socket.emit('createMessage', {
    from: 'user',
    text: input.value
  }, (data) => {
    input.value = "";
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