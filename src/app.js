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


app.get("/te?st", (req, res)=>{    // e is optional here
    res.send("Testing Routes")
})



app.get("/te+st", (req, res)=>{    // You can add as much e as you can
    res.send("Testing Routes")
})



app.get("/te*st", (req, res)=>{    // This will ignore all the other characters between e and s
    res.send("Testing Routes")
})


app.get(/.*fly$/, (req, res)=>{    // Regex can be added in the route
    res.send("Testing Routes")
})



// Reading the query paramas in the route

app.get("/about", (req, res)=>{    // You can add as much e as you can
    res.send("Testing Routes")
})
//end



// Reading the dynamic query in the route

app.get("/check/:userID", (req, res)=>{    // You can add as much e as you can
    console.log(req.params);
    
    res.send("Testing Routes")
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

