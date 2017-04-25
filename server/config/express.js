const express = require('express');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const appRoot = require('app-root-path');
const logger = require(`${appRoot}/server/config/logger`);
const util = require('util');

module.exports = (app) => {
  const env = process.env.NODE_ENV || 'development';

  app.locals.env = env;
  app.locals.pretty = env === 'development';

  app.set('views', `${appRoot}/server/views`);
  app.set('view engine', 'pug');
  app.set('trust proxy', 'loopback');

  app.use(morgan('combined', { stream: logger.stream }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(`${appRoot}/client/public`));

  app.use(helmet());
  app.use(methodOverride());

  //Put the runtime environment into every page.
  app.use((req, res, next) => {
    res.locals.environment = env;
    next();
  });

  app.use(require(`${appRoot}/server/controllers`));

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  app.use((err, req, res, next) => {
    logger.error(err.status || 500 + ' ' + util.inspect(err));

    res.status(err.status || 500).json({ name: err.name, message: err.message });
  });
};
