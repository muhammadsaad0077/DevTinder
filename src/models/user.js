const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        required: true
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true
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
        type: String
        

    },
    about: {
        type: String,
        default: "This is the devtinder user"
    },
    skills: {
        type: [String]
    }
    
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;