const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + "/src"))
// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(8080);
