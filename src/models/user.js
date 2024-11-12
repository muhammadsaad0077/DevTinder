const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: Number
    },
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;