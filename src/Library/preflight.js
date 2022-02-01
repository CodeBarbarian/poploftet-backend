/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *  @name:      Poploftet-Backend
 *  @version:   1.0
 *  @author:    Morten Haugstad
 *  @description: Backend for Poploftet
 * 
 *  @file: preflight.js
 *  @description: Library function. Responsible to check if everything is okay
 *                before launching the application and serving the server.
 * 
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

const database = require('./database');
let connection = database;

connection.connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});