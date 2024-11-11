const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./middlewares/authAdmin')


app.get("/", (req, res, next)=>{
    res.send("Welcome to the Home Page");
    
})


// app.use will give the same data for every http method that are get, post, delt etc...

/* app.use('/user', (req, res)=>{
    res.send("Data from use function")
}) */

// It will only give this data for get method
// app.get("/user", (req, res)=>{
//     res.send({firstname: 'Saad', lastname: 'Tanoli'})
// })


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

app.get("/about", (req, res)=>{    
    res.send("Testing Routes")
})
//end



// Reading the dynamic query in the route

app.get("/check/:userID", (req, res)=>{   
    console.log(req.params);
    
    res.send(`Hello ${req.params.userID}`)
})
//end


//special case
const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    res.write("I am from 2nd function\n");
    next()
  }
  
  const cb2 = function (req, res) {
    res.write('Hello from C!')
    res.end();
  }
  
  app.get('/example/c', [cb0, cb1, cb2])

//end



// special case

app.use('/exmp', (req, res, next)=>{
    console.log("Route run");
    next()
    
},
(req, res, next)=>{
    console.log("Next run");
    next()
}

)

app.use('/exmp', (req, res)=>{
    res.send("From 2nd Route")
})
//end


// Middleware Practical Usage

app.use('/admin', adminAuth)

app.get('/user', userAuth, (req, res)=>{
    res.send("Welcome User")
})

app.get('/admin/getData', (req, res, next)=>{
    res.send("Get All the Data")
})

app.get('/admin/getData', (req, res, next)=>{
    res.send("Deleted All the Data")
})
//end


app.get('/checking', (req, res)=>{
    try{
        throw new Error("Error Occured")
        res.send("Hello World");
    } catch(err){
        res.status(500).send("Something Went Wrong")
    }
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











