const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const idLength = 8

const booksSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String
}, {collection: 'books'})

const BookModel = mongoose.model('book', booksSchema)

exports.readAll = (req, res) => {
    // Load data from db
    BookModel.find().then(books => {res.send(books)})
}

exports.read = (req, res) => {
    try {
        BookModel.findOne({id: req.params.id}).then(book => {res.send(book)})
    } catch (error) {
        return res.status(404).send(error)
    }
}

exports.add = (req, res) => {
    try {
        const book = new BookModel({
            ...req.body,
            id: nanoid(idLength)
        })
        book.save()
        res.send(book)
    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.update = (req, res) => {
    try {
        BookModel.findOne({id: req.params.id})
            .then(book => {
                id = book['id']
                Object.assign(book, req.body)
                book['id'] = id
                book.save()
                res.send(book)
            })
    } catch(error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.remove = (req, res) => {
    try {
        BookModel.deleteOne({id: req.params.id})
            .then(book => {
                res.sendStatus(200)
            })
    } catch (error) {
        return res.status(404).send(error)
    }
}
