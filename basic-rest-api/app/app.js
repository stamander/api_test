const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const dbPath = "app/db/database.sqlite3"


app.get('/api/v1/users',(req,res)=>{
  //Conect database
  const db = new sqlite3.Database(dbPath)

  db.all("SELECT * FROM users",(err,rows) => {
    res.json(rows)

  })
  db.close()

})

//get a user
app.get('/api/v1/users:id',(req,res)=>{
  //Conect database
  const db = new sqlite3.Database(dbPath)
  const id = req.params.id

  db.get(`SELECT * FROM users WHERE id = ${id}`,(err,row) => {
    res.json(row)

  })
  db.close()

})

//serch
app.get('/api/v1/serch',(req,res)=>{
  //Conect database
  const db = new sqlite3.Database(dbPath)
  const keyword = req.query.q

  db.get(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`,(err,row) => {
    res.json(row)

  })
  db.close()

})


const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listen on port" +port)


