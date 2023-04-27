require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./src/database/models/index');

// cors config
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (_req, res) {
  res.send({
    name: 'API',
    environment: process.env.NODE_ENV,
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ErrorObject('endpoint not found', 404));
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({ statusCode, status: false, message: err.message });
});

/* istanbul ignore if */
// *This means: Run app.listen(8080) only if you are running the file
if (!module.parent) {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('Successful database connection');
      const server = app.listen(process.env.PORT, function () {
        const port = server.address().port;
        console.log('Example app listening at http://localhost:%s', port);
      });
    })
    .catch((error) => {
      console.log('Error in connection to database', error);
    });
}

module.exports = app;
