let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let dbnm = process.env.DB_NAME;

module.exports = {
DB:`mongodb://${host}:${port}/${dbnm}`
}