const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_Connection_String, {
        readPreference: 'secondaryPreferred' // Optional if you want to read from secondaries
      })
};

module.exports = connectDB;
