const mongoose = require('mongoose')

const makeConnection = async () => {
    const mongodb = {
        host: 'localhost',
        port: 27017,
        user: 'root',
        pw: 'example',
        db: 'test'
    }
    
    const db = mongoose.connection
    db.on('error', console.error)
    // db.on('open', () => console.log('Connected to mongodb server'))
    // db.on('close', () => console.log('Disconnected to mongodb server'))
    
    const strConn = `mongodb://${mongodb.user}:${mongodb.pw}@${mongodb.host}:${mongodb.port}`
    await mongoose.connect(
        strConn,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: mongodb.db,
            autoReconnect: false
        }
    )
}
makeConnection()

const booksSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String
}, {collection: 'books'})

const BookModel = mongoose.model('book', booksSchema)

module.exports = { mongoose, BookModel, booksSchema }
