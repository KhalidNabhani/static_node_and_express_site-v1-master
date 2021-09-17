const express = require("express");
const path = require("path");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
