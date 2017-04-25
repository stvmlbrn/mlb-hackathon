require('dotenv').config();

const appRoot = require('app-root-path');
const express = require('express');
const logger = require(`${appRoot}/server/config/logger`);
const ngrok = process.env.ENABLE_TUNNEL ? require('ngrok') : false;

const app = express();

require(`${appRoot}/server/config/express`)(app);

app.listen(process.env.PORT, function() {
  if (ngrok) {
    ngrok.connect(process.env.PORT, (err, url) => {
      if (err) {
        return logger.error(err);
      }
      logger.info(`Server started. Tunnel running at url ${url}`);
    });
  } else {
    logger.info(`Server listening on port ${process.env.PORT}`);
  }
});

