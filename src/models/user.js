const mongoose = require('mongoose')
const validator = require('validator')

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
        maxLength: 20

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
        required: true,
        minLength: 8,
        maxLength: 25,
        minLength: 8
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

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;