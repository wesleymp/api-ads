const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const router = require('./routes/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

module.exports = app;
