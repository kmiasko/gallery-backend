const SERVER_DEFAULT_PORT = 9090;
const DATABASE_DEFAULT_PORT = 27017;
const DATABASE_DEFAULT_HOST = 'localhost';
const DATABASE_DEFAULT_DB = 'gallery';
const DATABASE_DEFAULT_USERNAME = '';
const DATABASE_DEFAULT_PASSWORD = '';
const JWT_DEFAULT_SECRET = 'dumdumdum';

module.exports = {
  server: {
    port: process.env.PORT || SERVER_DEFAULT_PORT,
  },
  database: {
    host: process.env.API_DATABASE_HOST || DATABASE_DEFAULT_HOST,
    port: process.env.API_DATABASE_PORT || DATABASE_DEFAULT_PORT,
    username: process.env.API_DATABASE_USERNAME || DATABASE_DEFAULT_USERNAME,
    password: process.env.API_DATABASE_PASSWORD || DATABASE_DEFAULT_PASSWORD,
    db: process.env.API_DATABASE_DB || DATABASE_DEFAULT_DB,
  },
  jwt: {
    secret: process.env.API_JWT_SECRET || JWT_DEFAULT_SECRET,
    options: {
      expiresIn: '1d',
      algorithm: 'HS384',
    },
  },
  swagger: {
    configFile: 'swagger.yaml',
  },
};

