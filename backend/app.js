const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
  );

  app.use(routes);

  module.exports = app;
