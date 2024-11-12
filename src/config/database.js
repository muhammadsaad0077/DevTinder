const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://saad:saadi007@backend-learning.fbxi8.mongodb.net/devTinder")
};

module.exports = connectDB;
