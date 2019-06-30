'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var AliexScrape = require('aliexscrape');
var url = require('url');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../public'));
let productId;

app.get('/data', function (req, res) {
    AliexScrape(productId) // productId
        .then(response => res.json(JSON.parse(response)))
        .catch(error => console.log(error));
});

app.post('/', function (req, res) {
    const productUrl = req.body.productUrl;
    var urlParam = url.parse(productUrl, true);
    const regex = /([1-9])\w+/g;
    productId = regex.exec(urlParam.pathname)[0];
    res.end();
});

app.get('/product', function (req, res) {
    // res.send(productId);
    // console.log(productId);
});

app.listen(PORT, () => console.log(`Server opened at ${PORT}`));

module.exports.product =  productId;