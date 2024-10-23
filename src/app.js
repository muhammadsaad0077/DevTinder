const express = require('express');
const app = express();


app.get("/", (req, res)=>{
    res.send("Welcome to the Home Page");
})

app.get("/login", (req, res)=>{
    res.send("Welcome to the Login Page");
})

app.get("/hello", (req, res)=>{
    res.send("Welcome to the Hello Page");
})

app.get("/register", (req, res)=>{
    res.send("Welcome to the Register Page");
})



app.listen(3001, ()=>{
console.log("Server is successfully listening on 3000"); 
})

