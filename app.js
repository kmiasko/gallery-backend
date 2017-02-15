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

const config = require('./config');
const routes = require('./routes');

mongoose.Promise = promise;

(config.database.username)
  ? mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.db}`)
  : mongoose.connect(`mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('socketio', io);

app.use('/api', routes);

mongoose.connection.on('open', () => console.log('Connected to database'));
mongoose.connection.on('error', (err) => console.log('Error connecting to database', err));

http.listen(config.server.port, () => console.log(`Server listens on port ${config.server.port}`));

