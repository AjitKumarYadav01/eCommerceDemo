const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/router.js');
const loginRouter = require('./routes/login/login.js');

const checkapiapirouter = require('./routes/user/register.js');


const app = express();
 
app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());
 
app.use('/api', indexRouter);
app.use('/api', checkapiapirouter);
app.use('/api', loginRouter );

 
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
 
app.listen(3000,() => console.log('Server is running on port 3000'));
