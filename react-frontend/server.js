const path = require('path');
const logger = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev')); // TODO fix for NODE_ENV

app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');

app.all('/*', (req, res) => {
    res.render('index', {});
});

app.listen(8080, () => {
    console.log('Express server is up on port ' + 8080);
});

