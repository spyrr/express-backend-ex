const request = require('supertest')
// const mongoose = require('mongoose')
const app = require('../../src/app')
const { mongoose, BookModel } = require('../../src/controllers/db')


// describe('Health check', () => {
//     it('GET /health', async () => {
//         await request(app).get('/api/v1/health')
//             .expect(200)
//             .expect('Content-Type', /text/)
//             .expect('OK')
//     })
// })

describe('Books schema check', () => {
    beforeAll(async () => {
        app.db = { books: BookModel }
    })

    var testData = {
        title: 'test title',
        author: 'test author'
    }
    var chgTitle = 'test title test 2'

    it('GET /api/v1/books - get books', async () => {
        const res = await request(app).get('/api/v1/books')
        await expect(res.status).toBe(200)
    })
    
    it('POST /api/v1/books - add item', async () =>{
        const res = await request(app).post('/api/v1/books')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(testData)

        testData.id = res.body.id
        delete res.body._id
        delete res.body.__v

        await expect(res.status).toBe(200)
        await expect(res.body).toEqual(testData)
    })
    
    it('GET /api/v1/books/{ID} - get added item', async () => {
        const res = await request(app).get(`/api/v1/books/${testData.id}`)

        delete res.body._id
        delete res.body.__v

        await expect(res.status).toBe(200)
        await expect(res.body).toEqual(testData)
    })

    it('PUT /api/v1/books/{ID} - modify specific book', async () =>{
        const res = await request(app).put(`/api/v1/books/${testData.id}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send({title: chgTitle})
        await expect(res.status).toBe(200)
        await expect(res.body.title).toBe(chgTitle)
    })

    it('DELETE /api/v1/books/{ID} - remove specific book', async () =>{
        const res = await request(app).delete(`/api/v1/books/${testData.id}`)
        await expect(res.status).toBe(200)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
})
