require('dotenv').config();

module.exports = {
  "development": {
    "username": "root", //process.env.DB_USER 
    "password": "micontraseña", //process.env.DB_PASSWORD
    "database": "dh-grupo3", //process.env.DB_DATABASE 
    "host": "127.0.0.1", //process.env.DB_HOST 
    "dialect": "mysql", //process.env.DB_DIALECT 
    "port": 3306 //process.env.DB_PORT 
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
