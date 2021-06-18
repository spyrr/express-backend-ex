const { nanoid } = require('nanoid')
const idLength = 8

exports.readAll = async (req, res) => {
    try {
        const books = await req.app.db.books.find()
        res.send(books)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}

exports.read = async (req, res) => {
    try {
        const book = await req.app.db.books.findOne({id: req.params.id})
        res.send(book)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}

exports.add = async (req, res) => {
    try {
        const book = await req.app.db.books.create({
            ...req.body,
            id: nanoid(idLength)
        })
        res.send(book)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}

exports.update = async (req, res) => {
    try {
        delete req.body.id
        const rv = await req.app.db.books.updateOne({id: req.params.id}, req.body)
        const book = await req.app.db.books.findOne({id: req.params.id})
        res.send(book)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

exports.remove = async (req, res) => {
    try {
        const rv = await req.app.db.books.deleteOne({id: req.params.id})
        res.send('Removed')
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
