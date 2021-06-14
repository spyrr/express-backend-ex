db = null

try {
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

    with (mongodb) {
        mongoose.connect(
            //`mongodb://${user}:${pw}@${host}:${port}`,
            `mongodb://${user}:${pw}@${host}:${port}`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                dbName: db
            }
        )
        console.log('[DB] use MongoDB')
    }
    const booksSchema = new mongoose.Schema({
        id: String,
        title: String,
        author: String
    }, {collection: 'books'})
    // booksSchema.methods.write = () => {
    //     this.save((err, book) => { if(err) return console.err(err) } )
    // }
    const Book = mongoose.model('book', booksSchema)
    book = new Book({
        id: '12345678',
        title: 'test title',
        author: 'test author'
    })
    // book.save((err, book) => {
    //     if(err) return console.error(err)
    //     console.dir(book)
    // })
} catch (err) {
    const { Low, JSONFile } = require('lowdb')
    db = new Low(new JSONFile('../db.json'))
    db.read()
    console.log('[DB] use LowDB')
    console.log(err)
    
}

module.exports = { db }
// const URI = `mongodb://${ID}:${PW}@localhost:${PORT}/${DB_NAME}`

// db = mongoose.connection
// db.on('error', console.error)
// db.once('open', () => {
//     console.log('Connected to mongodb server')
// })
