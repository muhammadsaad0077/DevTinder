const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = (req, res, next)=>{   // Use will check for all the methods get, post, delete etc
    console.log("Admin Auth is being checked");
    
    const token = 'abc';
    const isAuthorized = token === 'asc';
    if(!isAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}


/*const userAuth = (req, res, next)=>{   // Use will check for all the methods get, post, delete etc
    console.log("User Auth is being checked");
    
    const token = 'abc';
    const isAuthorized = token === 'abc';
    if(!isAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}*/

const userAuth = async(req, res, next)=>{
    try{
    const {token} = req.cookies;

    
    

    if(!token){
        throw new Error('Invalid token')
    }

    const decodedData = await jwt.verify(token, 'saad@123');
    const { id } = decodedData;
    const user = await User.findById(id);

    if(!user){
        throw new Error("Invalid credientials!!!!");
    }
    req.user = user;
    next();
}

catch(err){
    res.status(400).send(`Error: ${err.message}`)
}

}

module.exports = {
    adminAuth, userAuth
}