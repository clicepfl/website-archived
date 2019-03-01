const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile('dev/index.html', {root: __dirname}))
app.use(express.static('dev'))
app.use(express.static('public'))

app.listen(8000, () => console.log("Server started on port 8000"))