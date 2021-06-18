import * as app from "./app"
import { BookModel } from "./controllers/db"

const PORT = process.env.PORT || 18888
// const { BookModel } = require('./controllers/db')
app.db = { books: BookModel }
console.log(typeof {})
app.listen(PORT, () => console.log(`listening on ${PORT}`))