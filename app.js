var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var penggunaRouter = require('./routes/penggunaRoute');
var alfiaRouter = require('./routes/alfiaRoute');
var maqalatRouter = require('./routes/maqalatRoute');
var taeliqRouter = require('./routes/taeliqRoute');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/almustaemal', penggunaRouter);
app.use('/api/alfia', alfiaRouter);
app.use('/api/maqalat', maqalatRouter);
app.use('/api/taeliq', taeliqRouter);

module.exports = app;
