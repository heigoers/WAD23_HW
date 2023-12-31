const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "password", //add your password
    database: "wad_hw",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
*/

const createUserTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createUserTblQuery).then(result => {
    if (result) {
        console.log('Table "users" is created!');
    }
});

const createPostTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts"
(
    post_id SERIAL PRIMARY KEY ,
    user_id uuid,
    create_time date,
    body text
);`;

execute(createPostTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created!');
    }
});

module.exports = pool;