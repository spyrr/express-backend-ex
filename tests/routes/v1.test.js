const request = require('supertest')
const app = require('../../app')
const _ = require('lodash')

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
        app.db = require('../../controllers/db')
    })

    var testData = {
        id: '',
        title: 'test title',
        author: 'test author'
    }
    var chgTitle = 'test title test 2'

    it('GET /api/v1/books - get books', async () => {
        await request(app).get('/api/v1/books')
            .expect(200)
    })
    
    it('POST /api/v1/books - add item', async () =>{
        await request(app).post('/api/v1/books')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(testData)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                resp = JSON.parse(res.text)
                testData.id = resp.id
                delete resp._id
                delete resp.__v

                if(!_.isEqual(resp, testData)) throw Error('Wrong data')
            })
    })
    
    it('GET /api/v1/books/{ID} - get added item', async () => {
        await request(app).get(`/api/v1/books/${testData.id}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                resp = JSON.parse(res.text)
                delete resp._id
                delete resp.__v
                if(!_.isEqual(resp, testData)) throw Error('Wrong data')
            })
    })

    it('PUT /api/v1/books/{ID} - modify specific book', async () =>{
        await request(app).put(`/api/v1/books/${testData.id}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send({title: chgTitle})
            .expect(200)
            .expect(res => {
                if(JSON.parse(res.text).title != chgTitle) throw Error('Failed')
            })
    })
    it('DELETE /api/v1/books/{ID} - remove specific book', async () =>{
        await request(app).delete(`/api/v1/books/${testData.id}`)
            .expect(200) 
    })
})
