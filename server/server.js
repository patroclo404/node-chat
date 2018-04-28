const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000 ;

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isValidString } = require('./utils/utils');
const { Users } = require('./utils/users');
const users = new Users();

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection' , ( socket ) => {

  socket.on('join' , (params, callback) => {
    
    if ( !isValidString(params.name) || !isValidString(params.room) ) {
      return callback('missingField');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin' , 'Welcome to chat room!!') );
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`) );
    callback();

  });

  socket.on('createMessage', (message,callback) => {
    let user = users.getUser(socket.id);
    if (user && isValidString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
    }
    callback('from server');

  });
  
  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name , coords.lat , coords.lon) );
    }
  });

  socket.on('disconnect', ( reason ) => {
    const userLeave = users.removeUser(socket.id);
    if (userLeave) {
      io.to(userLeave.room).emit('updateUserList', users.getUserList(userLeave.room));
      io.emit('newMessage', generateMessage('Admin', `User ${userLeave.name} leaves the room`));
    }
  });
});


server.listen(PORT, () => {
  console.log(`Started up at port ${PORT}`);
});


