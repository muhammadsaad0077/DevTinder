const express = require('express');
const app = express();
require('./config/database')


app.listen(3001, ()=>{
console.log("Server is successfully listening on 3000"); 
})

