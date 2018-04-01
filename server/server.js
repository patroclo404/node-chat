const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = process.env.PORT || 3000 ;
const { generateMessage, generateLocationMessage } = require('./utils/message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection' , ( socket ) => {
  console.log('new connection');

  socket.emit('newMessage', generateMessage('Admin' , 'Welcome to chat room!!') );

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!') );

  socket.on('createMessage', (message , callback) => {

    console.log('createMessage',message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('from server');
    
  });
  
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin' , coords.lat , coords.lon) );

  });

  socket.on('disconnect', ( reason ) => {
    console.log(reason);
  });
});


server.listen(PORT, ()=>{
  console.log(`Started up at port ${PORT}`);
});


