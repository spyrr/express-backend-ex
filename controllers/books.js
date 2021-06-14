const { nanoid } = require('nanoid')
const idLength = 8

exports.readAll = (req, res) => {
    const books = req.app.db.data.books
    res.send(books)
}

exports.read = (req, res) => {
    const book = req.app.db.data.books.find((p) => p.id === req.params.id)
    if(!book) {
        res.sendStatus(404)
    }
    res.send(book)
}

exports.add = (req, res) => {
    try {
        const book = {
            ...req.body,
            id: nanoid(idLength)
        }
        const { books } = req.app.db.data
        books.push(book)
        req.app.db.write()
        res.send(book)
    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.edit = (req, res) => {
    try {
        book = req.app.db.data.books.find((p) => p.id === req.params.id)
        book = Object.assign(book, req.body)
        req.app.db.write()
        res.send(req.app.db.data.books.find((p) => p.id === req.params.id))
    } catch(error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.remove = (req, res) => {
    req.app.db.data.books.splice(
        req.app.db.data.books.findIndex((p) => p.id === req.params.id), 1
    )
    req.app.db.write()
    res.sendStatus(200)
}