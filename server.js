const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const blogRoutes = require('./routes/blogRoutes')
app.use('/api/v1/blogs', blogRoutes)


app.listen(PORT, () => {
    console.log('\x1b[42m%s\x1b[0m',`Server started successfully at ${PORT}`)
})

const dbConnect = require('./config/database')
dbConnect()