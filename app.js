//Import packages
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

//Initialize app
const app = express()

//Import script 
const poll = require('./routes/poll')


//Set public folder
app.use(express.static(path.join(__dirname, 'public')))

//Body parsing
app.use(express.json())

//Cross-domain enabling
app.use(cors())

//Routing
app.use('/poll', poll )
//Port
const port = 3000

app.listen(port, ()=> console.log(`Server statrted on port ${port}`))