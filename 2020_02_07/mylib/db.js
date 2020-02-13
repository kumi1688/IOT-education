var mysql = require('mysql');

db = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'ajoumysql123!',
    database : 'nodejs'
});

module.exports = db;
