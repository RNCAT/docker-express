require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  const [rows] = await connection.execute('SELECT * FROM users')

  res.status(200).json({ users: rows })
})

app.listen(port)
