// Get "express" Package
const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080;
const PUBLIC = __dirname + '/frontend'

app.use(express.static(PUBLIC))

app.listen(PORT, () => console.log(`Head to http://localhost:${PORT}`))