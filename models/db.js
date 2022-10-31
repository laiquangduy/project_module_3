const mysql = require("mysql2");
let pool = mysql.createPool({
    host: "localhost",
    database: "instagram_schema",
    user: "root",
    password: "giadinhno1",
})

module.exports = pool.promise();
