const express = require('express');
const app = express();


app.get("/", (req, res)=>{
    res.send("Welcome to the Home Page");
})


// app.use will give the same data for every http method that are get, post, delt etc...

/* app.use('/user', (req, res)=>{
    res.send("Data from use function")
}) */

// It will only give this data for get method
app.get("/user", (req, res)=>{
    res.send({firstname: 'Saad', lastname: 'Tanoli'})
})

app.post("/user", (req, res)=>{
    res.send('Data Sucessfully Saved to Database')
})

app.delete("/user", (req, res)=>{
    res.send('Data Sucessfully Deleted from Database')
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

