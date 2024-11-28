const mongoose = require('mongoose')

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
        minLength: 6

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phoneNo: {
        type: Number,
        required: true,
        minLength: 8,
        maxLength: 25
    },
    photo: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
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
        min: 10
        

    },
    about: {
        type: String,
        default: "This is the devtinder user"
    },
    skills: {
        type: [String]
    }
    
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;