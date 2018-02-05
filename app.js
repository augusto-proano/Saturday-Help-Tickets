const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/db');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (require.main === module){
  db
    .sync()
    .then(() =>
      app.listen(3000, function() {
        console.log('Server is listening on port 3000!');
      })
    )
    .catch(console.error);
}

module.exports = app;
