const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const  path  = require('path')

const dbPath = "app/db/database.sqlite3"

app.use(express.static(path.join(__dirname,'public')))

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

//search
app.get('/api/v1/search',(req,res) => {
  //Conect database
  const db = new sqlite3.Database(dbPath)
  const keyword = req.query.q

  db.all(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`,(err,rows) => {
    res.json(rows)

  })
  db.close()

})



const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listen on port" +port)


