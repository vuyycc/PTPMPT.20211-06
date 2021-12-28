
const mysql = require('mysql');
const util = require('util');

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST_IP,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   });

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'caro',
});

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error("Database connection was closed");
        }
        if(err.code == 'ER_CON_COUNT_ERROR') {
            console.error("Database has too many connection");
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('Database connection was refused.')
        }
    }
    if(connection) connection.release;
    return;
})
const query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => query(sql),
    getAll: (tableName) => query(`SELECT * FROM ${tableName}`),
    get: (tableName, entity) => query(`SELECT * FROM ${tableName} WHERE ?`, entity),
    add: (tableName, entity) => query(`INSERT INTO ${tableName} SET ?`, entity),
    delete: (tableName, entity) => query(`DELETE FROM ${tableName} WHERE ?`,entity ),
    update: (tableName, entity, condition) => query(`UPDATE ${tableName} SET ? WHERE ?`,[entity, condition])
};