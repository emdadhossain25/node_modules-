const express = require('express');
var app = express();

const mysql = require('mysql');
const morgan = require('morgan');

// app.use(morgan('combined'));


app.get('/users/:id',(req,res)=>{
  console.log('we are fetching data for id: '+ req.params.id);
  const connection = mysql.createConnection({
    host: '192.168.56.1',
    user:'emdad',
    password:'emdad123123',
    database: 'lbta_mysql'

  })

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

app.get("/users", (req, res) =>{
var user1 = {firstName:"Stephen",lastName:"Curry"};
const user2 = {firstName:"Emdad",lastName:"Hossain"};
// res.send('nodemon auto updates when i save this file');
  res.json([user1,user2]);

})

app.get("/", (req, res) =>{
  console.log("response to root route");
  res.send('hello from groot');
})
app.listen(3003, ()=>{
  console.log('server is listening 3003');
});
