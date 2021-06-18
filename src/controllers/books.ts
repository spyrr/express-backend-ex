import * as express from "express"
import { nanoid } from "nanoid"
const idLength: number = 8

export const readAll = async (req: express.Request, res: express.Response) => {
    try {
        const books = await req.app.db.books.find()
        res.send(books)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}

export const read = async (req: express.Request, res: express.Response) => {
    try {
        const book = await req.app.db.books.findOne({id: req.params.id})
        res.send(book)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}

export const add = async (req: express.Request, res: express.Response) => {
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

export const update = async (req: express.Request, res: express.Response) => {
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

export const remove = async (req: express.Request, res: express.Response) => {
    try {
        const rv = await req.app.db.books.deleteOne({id: req.params.id})
        res.send('Removed')
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
