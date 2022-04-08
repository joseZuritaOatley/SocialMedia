const express = require('express')
const connectDB = require('./config/db')

const app = express()

//connect to database
connectDB()

//innit middleware
app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.get('/', (req, res) => res.send('API Running'))

//if no env set, it will default to 5000
const PORT = process.env.PORT || 6000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
