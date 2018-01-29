const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const Student = require('./routes/student')
const Test = require('./routes/test')
const db = require('./db/db')

//Body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Logging middleware
app.use(volleyball)

//Sending requests to routes
app.use('/student', Student)
app.use('/test', Test)


//Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//Sync db and then start server
db.sync()
  .then(() => app.listen(3000, function () {
    console.log('Server is listening on port 3000!')
    })
  )
  .catch(console.error)
