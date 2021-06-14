const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// const { db } = require('./controllers/db')
const csurf = require('csurf')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const routerV1 = require('./routes/v1')  // using json with lowdb
// const routerV2 = require('./routes/v2')  // using mongodb with mongoose

const app = express()
const { Low, JSONFile } = require('lowdb')
db = new Low(new JSONFile('./db.json'))

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
// app.use(csurf())

// const swaggerOptions = 
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
    //apis: ['./routes/*.js', ]
    apis: ['./routes/v1.js', ]
})
console.log(swaggerDocs)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/v1', routerV1)

db.read().then(() => {
    console.debug('State has been updated')
    app.db = db
})
module.exports = app;
