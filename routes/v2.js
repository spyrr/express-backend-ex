const express = require('express')
const router = express.Router()
const books = require('../controllers/books')
const healthMap = [{
    uri: '/health',
    method: 'get',
    callback: (req, res) => { res.send('OK') }
}]
const booksMap = [
    /**
     * @swagger
     * /api/v2/books:
     *   get:
     *     summary: Returns the list of all the books
     *     tags: [Books]
     *     responses:
     *       200:
     *         description: The list of the books
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     */
    {uri: '/books', method: 'get', callback: books.readAll},
    /**
     * @swagger
     * /api/v2/books/{id}:
     *   get:
     *     summary: Get the book by id
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The book id
     *     responses:
     *       200:
     *         description: The book description by id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       404:
     *         description: The book was not found
     */
    {uri: '/books/:id', method: 'get', callback: books.read},
    /**
     * @swagger
     * /api/v2/books:
     *   post:
     *     summary: Create a new book
     *     tags: [Books]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Book'
     *     responses:
     *       200:
     *         description: The book was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       404:
     *         description: The book was not found
     *       500:
     *         dsecription: Some server Error
     */
    {uri: '/books', method: 'post', callback: books.add},
    /**
     * @swagger
     * /api/v2/books/{id}:
     *   put:
     *     summary: Get the book by id
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The book id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Book'
     *     responses:
     *       200:
     *         description: The book was updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       404:
     *         description: The book was not found
     *       500:
     *         description: Some error happened
     */
    {uri: '/books/:id', method: 'put', callback: books.edit},
    /**
     * @swagger
     * /api/v2/books/{id}:
     *   delete:
     *     summary: Remove the book by id
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The book id
     *     responses:
     *       200:
     *         description: The book was deleted
     *       404:
     *         description: The book was not found
     *       500:
     *         description: Some error happened
     */
    {uri: '/books/:id', method: 'delete', callback: books.remove},
]

const schemas = [
    healthMap,
    /**
     * @swagger
     * components:
     *   schemas:
     *     Book:
     *       type: object
     *       required:
     *         - title
     *         - author
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the book
     *         title:
     *           type: string
     *           description: The book title
     *         author:
     *           type: string
     *           description: The book author
     *       example:
     *         id: d5fE_asz
     *         title: The New Turing Omnibus
     *         author: Alexander K. Dewdney
     */
    booksMap,
]

for (let map of schemas) {
    map.map((m) => {
        if (m.method === 'get') router.get(m.uri, m.callback)
        else if(m.method === 'post') router.post(m.uri, m.callback)
        else if(m.method === 'put') router.put(m.uri, m.callback)
        else if(m.method === 'delete') router.delete(m.uri, m.callback)
        else console.log('ERROR')
    })
   
}

module.exports = router
