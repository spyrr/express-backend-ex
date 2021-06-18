import * as express from "express"
import * as morgan from "morgan"
import * as cors from "cors"
import * as swaggerJsDoc from "swagger-jsdoc"
import * as swaggerUI from "swagger-ui-express"
import * as routerV1 from "./routes/v1"
import { MyExApp } from "../types/express"

const app: MyExApp = express()

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
    apis: ['./routes/v1.js', ]
})
console.info(swaggerDocs)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/v1', routerV1)

if(process.env.NODE_ENV !== 'test') {
    require('./server')
}

export = app;
