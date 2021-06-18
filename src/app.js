require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const routerV1 = require('./routes/v1')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const swaggerDocs = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A Simple Express Library API'
        },
        servers: [{url: 'http://localhost:18888'}],
    },
    apis: [
        (process.cwd() + '/src/routes/v1.js').replace('/src/src/', '/src/'),
    ]
})
console.info(swaggerDocs)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/v1', routerV1)

if(process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 18888
    const { BookModel } = require('./controllers/db')
    app.db = { books: BookModel }
    app.listen(PORT, () => console.log(`listening on ${PORT}`))
}

module.exports = app;
