const express = require('express');
const app = express();
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth')
const profileRouter = require('./router/profile')
const connectionRouter = require('./router/connection');
const userRouter = require('./router/user');
const cors = require('cors');
const http = require('http')
const paymentRouter = require('./router/payment');
const intializeSocket = require('./utils/socket');
require('dotenv').config()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', connectionRouter);
app.use('/', userRouter);
// app.use('/', paymentRouter);

const server = http.createServer(app)
intializeSocket(server)



connectDB()
.then(()=>{
    console.log("Database established...");

    server.listen(process.env.PORT, ()=>{
        console.log("Server is successfully listening on 3001"); 
        })
    
})
.catch((err)=>{
  console.error(`Database can not established... + ${err}`)
})




