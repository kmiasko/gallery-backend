global.ROOT_DIR = __dirname;
global.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const isEmpty = require('lodash/isEmpty');

const config = require('./config');
const routes = require('./routes');
const swagger = require('./swagger');
const { errorHandler } = require('./middleware');

mongoose.Promise = promise;

swagger()
  .then(swaggerMiddleware =>
    app
      .use(swaggerMiddleware.swaggerUi())
      .use(bodyParser.urlencoded({ extended: false }))
      .use(bodyParser.json())
      .use(cors())
      .set('socketio', io)
      .use('/api', routes)
      .use(errorHandler)
  )
  .then(() => {
    let connect_uri = null;
    (isEmpty(config.database.username))
      ? connect_uri = `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`
      : connect_uri = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`;

    mongoose.connect(connect_uri);
    mongoose.connection.on('open', () => console.log('Connected to database', connect_uri));
    mongoose.connection.on('error', (err) => console.log('Error connecting to database', err));
    http.listen(config.server.port, () => console.log(`Server listens on port ${config.server.port}`));
  })
  .catch(err => console.error(err));

