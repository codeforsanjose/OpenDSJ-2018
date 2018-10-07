const path = require('path');
const logger = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetchService = require('./services/FetchService');

app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev')); // TODO fix for NODE_ENV

app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');

app.get(['/'], (req, res) => {
    res.render('index', {});
});


const getRepresentativeInfo = (address) => {
    const API_KEY = 'AIzaSyCWhwRupMs7IeE4IrGEgHtT0Nt-IGZnP9E';
    const endURL = '&key='+ API_KEY;
    const formattedAddress = address.split(' ').join('+');
    const baseRepURL = `https://www.googleapis.com/civicinfo/v2/representatives?address=${formattedAddress}${endURL}`;
    fetchService.fetchRequest(baseRepURL)
    .then(response => {
        console.log('response', response)
    })

}
const getElectionsInfo = () => {
    const API_KEY = 'AIzaSyCWhwRupMs7IeE4IrGEgHtT0Nt-IGZnP9E';
    const endURL = '&key='+ API_KEY;
    const baseElectionsURL = `https://www.googleapis.com/civicinfo/v2/elections?alt=json&prettyPrint=true${endURL}`;
}

app.listen(8080, () => {
    console.log('Express server is up on port ' + 8080);
});

