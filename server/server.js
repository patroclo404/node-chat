const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000 ;

let app = express();

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.listen(PORT, ()=>{
  console.log(`Started up at port ${PORT}`);
});

module.exports = { app };

