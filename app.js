const express = require('express');
var app = express();

const mysql = require('mysql');
const morgan = require('morgan');
const bodyParser = require('body-parser');



app.use(morgan('short'));
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:false}));

function getConnection(){
  return mysql.createConnection({
    host: '192.168.56.1',
    user:'emdad',
    password:'emdad123123',
    database: 'lbta_mysql'
  })
}

app.post('/user_create',(req,res)=>{
  console.log('trying to create a new user ...')
  console.log(req.body.create_first_name)
  console.log(req.body.create_last_name)

  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;
  
  const queryString = 'INSERT INTO users(first_name,last_name) VALUES(?,?)';
  getConnection().query(queryString,[firstName,lastName],(error,rows,fields)=>{
    if(error){
      console.log(error)
      res.sendStatus(500);
    }
    console.log("data "+rows.insertId);
    res.end()
  })
  
})

app.get('/users/:id',(req,res)=>{
  console.log('we are fetching data for id: '+ req.params.id);
  const connection = getConnection();
  const userId = req.params.id;
  const queryString ="SELECT * FROM  users WHERE id =?" 
  connection.query(queryString,[userId],(error,rows,fields)=>{

    if(error){
      console.log('I think we failed got an error: '+error);
      res.sendStatus(500)
      return;
    }

    const users = rows.map((row) => {
      return{firstName: row.first_name, lastName: row.last_name};
    })
    res.json(users);
    // console.log("I think we successfully fetched")
   
  });


  // res.end();
})



  /**
   * getting all users 
   */

app.get('/users',(req,res)=>{
  // console.log('we are fetching data for id: '+ req.params.id);
  const connection = getConnection();


  

  const queryString ="SELECT * FROM  users" 
  connection.query(queryString,(error,rows,fields)=>{

    if(error){
      console.log('I think we failed got an error: '+error);
      res.sendStatus(500)
      return;
    }

    const users = rows.map((row) => {
      return{firstName: row.first_name, lastName: row.last_name};
    })
    res.json(users);
    // console.log("I think we successfully fetched")
   
  });


  // res.end();
})

app.get("/", (req, res) =>{
  console.log("response to root route");
  res.send('hello from groot');
})
app.listen(3003, ()=>{
  console.log('server is listening 3003');
});
