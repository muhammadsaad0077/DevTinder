const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    name: {
        type: String
    },
    passcode: {
        type: String
    },
    nickname: {
        type: String
    }
})

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;