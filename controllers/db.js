const mongoose = require('mongoose')

const mongodb = {
    host: 'localhost',
    port: 27017,
    user: 'root',
    pw: 'example',
    db: 'test'
}
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => console.log('Connected to mongodb server'))

const strConn = `mongodb://${mongodb.user}:${mongodb.pw}@${mongodb.host}:${mongodb.port}`
mongoose.connect(
    strConn,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: mongodb.db
    }
)
console.log('[DB] use MongoDB')

module.exports = { db }
