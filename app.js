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

const server = app.listen(port, ()=> console.log(`Server started on port ${port}`))

//Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Error: ${err.message}`.red);  
//     //close server and exit process
//     server.close(() => process.exit(1));
//   });
  