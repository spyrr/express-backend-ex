const app = require('./app')
const PORT = process.env.PORT || 18888
app.listen(PORT, () => console.log(`listening on ${PORT}`))
