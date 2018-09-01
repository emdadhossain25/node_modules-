const express = require('express');
var app = express();

const mysql = require('mysql');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/user');



app.use(morgan('short'));
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(router)





app.listen(3003, ()=>{
  console.log('server is listening 3003');
});
