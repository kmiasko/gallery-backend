const promise  = require('bluebird');
const fs       = require('fs');
const joinPath = require('path').join;
const swagger  = require('swagger-tools');
const jsyaml   = require('js-yaml');
const config   = require('./config');

const spec = fs.readFileSync(joinPath(__dirname, config.swagger.configFile), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

const loadSwagger = () => new promise(resolve =>
  swagger.initializeMiddleware(swaggerDoc, resolve));

module.exports = loadSwagger;

