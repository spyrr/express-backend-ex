const mongoose = require('mongoose')

const makeConnection = async () => {
    mongoose.connection.on('error', console.error)
    // db.on('open', () => console.log('Connected to mongodb server'))
    // db.on('close', () => console.log('Disconnected to mongodb server'))
    
    await mongoose.connect(process.env.MONGODB_STR, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: process.env.DB_NAME
    })
}
makeConnection()

const booksSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String
}, {collection: 'books'})

const BookModel = mongoose.model('book', booksSchema)

module.exports = { mongoose, BookModel, booksSchema }
