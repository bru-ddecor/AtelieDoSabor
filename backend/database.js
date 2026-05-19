import mysql from 'mysql2/promise';

export async function conectarDB() {
    const configs = {
        host:       process.env.DB_HOST,
        user:       process.env.DB_USER,
        password:   process.env.DB_PASSWORD,
        database:   process.env.DB_NAME,
        port:       process.env.DB_PORTA
    }
    const con = await mysql.createConnection(configs);
    console.log("Site rodando!");
    return con;
}