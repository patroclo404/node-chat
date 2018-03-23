const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = process.env.PORT || 3000 ;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection' , ( socket ) => {
  console.log('new connection');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'new user join',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', (newEmail) => {

    console.log( 'createMessage' , newEmail );

    io.emit('newMessage', {
      from: newEmail.from,
      text: newEmail.text,
      createdAt : new Date().getTime(),
    });

    // socket.broadcast.emit('newMessage' , {
    //   from : 'jon@mail.com',
    //   text : 'wathss',
    //   createdAt : new Date().getTime(),
    // });

  });

  socket.on('disconnect', ( reason ) => {
    console.log(reason);
  });
});


server.listen(PORT, ()=>{
  console.log(`Started up at port ${PORT}`);
});


