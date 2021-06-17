const express = require('express')
const router = express.Router()
const books = require('../controllers/books')

const healthMap = [{
    uri: '/health',
    method: 'get',
    proc: (req, res) => { res.send('OK') }
}]

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
const booksMap = [
    /**
     * @swagger
     * /api/v1/books:
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
    {uri: '/books', method: 'get', proc: books.readAll},
    /**
     * @swagger
     * /api/v1/books/{id}:
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
    {uri: '/books/:id', method: 'get', proc: books.read},
    /**
     * @swagger
     * /api/v1/books:
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
    {uri: '/books', method: 'post', proc: books.add},
    /**
     * @swagger
     * /api/v1/books/{id}:
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
    {uri: '/books/:id', method: 'put', proc: books.update},
    /**
     * @swagger
     * /api/v1/books/{id}:
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
    {uri: '/books/:id', method: 'delete', proc: books.remove},
]

const schemas = [
    healthMap,
    booksMap,
]

for (let map of schemas) {
    map.map((m) => {
        if (m.method === 'get') router.get(m.uri, m.proc)
        else if(m.method === 'post') router.post(m.uri, m.proc)
        else if(m.method === 'put') router.put(m.uri, m.proc)
        else if(m.method === 'delete') router.delete(m.uri, m.proc)
        else console.log('ERROR')
    })
   
}

module.exports = router
