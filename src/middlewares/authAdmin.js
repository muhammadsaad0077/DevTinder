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


const userAuth = (req, res, next)=>{   // Use will check for all the methods get, post, delete etc
    console.log("User Auth is being checked");
    
    const token = 'abc';
    const isAuthorized = token === 'abc';
    if(!isAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth, userAuth
}