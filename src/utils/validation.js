const validator = require('validator')

const validateUserData = (req)=>{
    const data = req.body;
    const {firstName, lastName, email, password} = data;

    if(!firstName || !lastName){
        throw new Error("Enter first or last name please");
    }

    if(!validator.isEmail(email)){
        throw new Error("Please enter valid email ID");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong password")
    }

}

module.exports = {validateUserData}