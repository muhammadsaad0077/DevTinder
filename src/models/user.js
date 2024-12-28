const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 25
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 200

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength: 50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    phoneNo: {
        type: Number,
        minLength: 4,
        maxLength: 25
    },
    photo: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
        maxLength: 200,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid: ")
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if(!['female', 'male', 'others'.includes(value)]){
                throw new Error("Gender data is not valid")
            }
        }
        
    },
    age: {
        type: Number,
        min: 10,
        max: 90,
        maxLength: 3,
        minLength: 1
        

    },
    about: {
        type: String,
        default: "This is the devtinder user",
        maxLength: 300,
    },
    skills: {
        type: [String],
        maxLength: 250,
    }
    
}, {timestamps: true})

userSchema.methods.getJWT = async function(){   // always use normal function here because the keyword this has different behaviour in arrow function
    const user = this;  // Here the this refers to the current user

    const token = await jwt.sign({id: user._id}, 'saad@123')

    return token;
}

userSchema.methods.comparePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const checkPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return checkPassword;

}



const userModel = mongoose.model("User", userSchema);

module.exports = userModel;